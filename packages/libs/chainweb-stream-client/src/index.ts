import EventEmitter from 'eventemitter2';
import HeartbeatTimeoutError from './heartbeat-timeout-error.js';
import ConnectTimeoutError from './connect-timeout-error.js';
import {
  IChainwebStreamConstructorArgs,
  ChainwebStreamType,
  GenericData,
  ConnectionState,
} from './types.js';

export * from './types.js';

const CONFIRMATION_DEPTH: number = 6;
const DEFAULT_CONNECT_TIMEOUT: number = 25_000;
const DEFAULT_HEARTBEAT_TIMEOUT: number = 35_000;
const DEFAULT_MAX_RECONNECTS: number = 6;
const LIMIT: number = 100;

class ChainwebStream extends EventEmitter {
  public host: string; // chainweb-stream backend host, full URI - e.g. https://sse.chainweb.com
  public type: ChainwebStreamType;
  public id: string;
  public limit: number | undefined;
  public connectTimeoutMs: number; // initial connection timeout in ms
  public heartbeatTimeoutMs: number; // heartbeat timeout in ms
  public maxReconnects: number; // maximum number of reconnection attempts

  private _desiredState: ConnectionState = ConnectionState.None; // desired eventsource state
  // TODO the "WaitReconnect" state is currently stored in desiredState. Is this correct design-wise?

  private _eventSource?: EventSource;
  private _lastHeight?: number; // last tracked height, used for resuming gracefully

  private _failedConnectionAttempts: number = 0; // counter for failed connection attempts; used for exponential backoff
  private _totalConnectionAttempts: number = 0; // total failed connection attempts; used to emit reconnect instead of connect

  private _connectTimer?: ReturnType<typeof setTimeout>; // connect timeout for better error handling on an unresponsive server with an open socket (ctrl+z the sse server to simulate this)
  private _heartbeatTimer?: ReturnType<typeof setTimeout>; // heartbeat timer
  private _reconnectTimer?: ReturnType<typeof setTimeout>; // reconnect timer

  public constructor({
    host,
    type,
    id,
    limit,
    connectTimeout,
    maxReconnects,
    heartbeatTimeout,
  }: IChainwebStreamConstructorArgs) {
    super();
    this.type = type;
    this.id = id;
    this.host = host.endsWith('/') ? host.substr(0, host.length - 1) : host; // strip trailing slash if provided
    if (limit !== undefined) {
      this.limit = limit;
    }
    this.connectTimeoutMs = connectTimeout ?? DEFAULT_CONNECT_TIMEOUT;
    this.heartbeatTimeoutMs = heartbeatTimeout ?? DEFAULT_HEARTBEAT_TIMEOUT;
    this.maxReconnects = maxReconnects ?? DEFAULT_MAX_RECONNECTS;
  }

  public connect = (): void => {
    this._debug('connect');
    this._desiredState = ConnectionState.Connected;
    this._eventSource = new EventSource(this._makeConnectionURL());
    this._eventSource.onopen = this._handleConnect;
    this._eventSource.onerror = this._handleError;
    if (this._connectTimer) {
      clearTimeout(this._connectTimer);
    }
    this._connectTimer = setTimeout(
      () => this._handleError(new ConnectTimeoutError()),
      this.connectTimeoutMs,
    );
  };

  public disconnect(): void {
    this._desiredState = ConnectionState.Closed;
    this._eventSource?.close();
    // TODO Should we null out this._eventSource?
    this._stopHeartbeatMonitor();
    this._debug('disconnect');
  }

  public get state(): ConnectionState {
    const { _eventSource } = this;
    // special case: are we waiting to reconnect? (expo backoff)
    if (this._desiredState === ConnectionState.WaitReconnect) {
      return this._desiredState;
    }
    if (_eventSource) {
      return _eventSource.readyState;
    }
    return ConnectionState.None;
  }

  private _handleConnect = (): void => {
    const {
      _failedConnectionAttempts: consecutiveFailedAttempts,
      _totalConnectionAttempts: totalAttempts,
      _eventSource,
    } = this;
    this._debug('_handleConnect', { consecutiveFailedAttempts, totalAttempts });
    this._failedConnectionAttempts = 0;
    if (!_eventSource) {
      throw new Error(
        'ChainwebStream._handleConnect called without an _eventSource. This should never happen',
      );
    }
    _eventSource.addEventListener('initial', this._handleData);
    _eventSource.addEventListener('message', this._handleData);
    _eventSource.addEventListener('ping', this._resetHeartbeatTimeout);
    this._resetHeartbeatTimeout();
    if (this._connectTimer) {
      clearTimeout(this._connectTimer);
    }
    this.emit(this._totalConnectionAttempts ? 'reconnect' : 'connect');
    this._totalConnectionAttempts += 1;
  };

  /*
   * Chrome has different reconnecting strategy (some) vs Firefox (none)
   * so we disable reconnections and handle them manually
   */
  private _handleError = (
    err: HeartbeatTimeoutError | ConnectTimeoutError | Event,
  ): void => {
    this._failedConnectionAttempts += 1;
    this._totalConnectionAttempts += 1;
    this._eventSource?.close();
    if (this._connectTimer) {
      clearTimeout(this._connectTimer);
    }
    let message = 'Connection error'; // default for "Event". No error information is available, presume disconnection
    if (err instanceof HeartbeatTimeoutError) {
      // special case: heartbeat timeout
      message = `Connection stale (no heartbeats for ${this.heartbeatTimeoutMs} ms)`;
    } else if (err instanceof ConnectTimeoutError) {
      // special case: initial connection timeout
      message = `Connection timeout (timeout ${this.connectTimeoutMs} ms)`;
    }
    const willRetry = this._failedConnectionAttempts < this.maxReconnects;
    const timeout = this._getTimeout();
    this._debug('_handleError', { message, willRetry, timeout });
    if (!willRetry) {
      this.emit('error', message); // TODO need to wrap in Error ?
      this._desiredState = ConnectionState.Closed;
      return;
    }
    this.emit('warn', message);
    this.emit('will-reconnect', message);
    this._desiredState = ConnectionState.WaitReconnect;
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer);
    }
    this._reconnectTimer = setTimeout(this.connect, timeout);
  };

  private _handleData = (msg: any): void => {
    // TODO warning any
    this._debug('_handleData', { length: msg.data?.length });

    const message = JSON.parse(msg.data) as GenericData | GenericData[];

    const data: GenericData[] = Array.isArray(message) ? message : [message];

    const newMinHeight = data.reduce(
      (highest, { height }) => (height > highest ? height : highest),
      0,
    );

    if (!this._lastHeight || newMinHeight > this._lastHeight) {
      this._lastHeight = newMinHeight;
    }

    for (const element of data) {
      const {
        meta: { confirmations },
      } = element;
      if (confirmations >= CONFIRMATION_DEPTH) {
        this.emit('confirmed', element);
      } else {
        this.emit('unconfirmed', element);
      }
    }

    this._resetHeartbeatTimeout();
  };

  private _stopHeartbeatMonitor = (): void => {
    if (this._heartbeatTimer) {
      clearTimeout(this._heartbeatTimer);
    }
  };

  private _resetHeartbeatTimeout = (): void => {
    // this._debug('_resetHeartbeatTimeout');
    this._stopHeartbeatMonitor();
    this._heartbeatTimer = setTimeout(
      this._handleHeartbeatTimeout,
      this.heartbeatTimeoutMs,
    );
  };

  private _handleHeartbeatTimeout = (): void => {
    this._debug('_handleHeartbeatTimeout');
    this._handleError(new HeartbeatTimeoutError());
  };

  private _makeConnectionURL(query?: string): string {
    const { host, type, id } = this;

    let path = `/stream/${type}/${id}`;

    // pass query string args. minHeight and limit for now.
    const urlParamArgs: string[][] = [];
    if (this.limit !== undefined) {
      urlParamArgs.push(['limit', String(this.limit)]);
    }
    if (this._lastHeight !== undefined) {
      urlParamArgs.push(['minHeight', String(this._lastHeight)]);
    }
    if (urlParamArgs.length) {
      path += '?' + new URLSearchParams(urlParamArgs).toString();
    }
    return `${host}${path}`;
  }

  private _getTimeout(): number {
    return Math.pow(this._failedConnectionAttempts, 3) * 1000 + 100;
  }

  private _debug(caller: string, payload?: Record<string, any>): void {
    this.emit('debug', { ts: new Date(), method: caller, ...payload });
  }
}

export default ChainwebStream;
