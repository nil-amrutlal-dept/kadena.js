import {
  headers,
  headerStream,
  recentHeaders,
  headerByBlockHash,
} from './headers';
import {
  IBlockHeader,
  IBlockPayloadMap,
  IBlockPayloads,
  IRetryOptions,
  ITransactionElement,
} from './types';
import { payloads } from './internal';

/* ************************************************************************** */
/* Blocks */

/**
 * Utility function for collecting the payloads with outputs for a set
 * of headers from the same chain.
 *
 * TODO: Currently all blocks must be from the same chain. We should support
 * blocks from different chains.
 *
 * TODO: The use of this function below is inefficient. It would be better
 * to start fetching payloads asynchronously while iterating through
 * block header pages.
 */

/**
 * Blocks from a range of block heights
 *
 * @param hrds - a array of block headers
 * @param network - chainweb network
 * @param host - chainweb api host
 * @param retryOptions - retry options object as accepted by the retry package
 *
 * @alpha
 */
export async function headers2blocks(
  hdrs: IBlockHeader[],
  network: string,
  host: string,
  retryOptions?: IRetryOptions,
): Promise<IBlockPayloads<ITransactionElement>[]> {
  let missing = hdrs;
  const result: IBlockPayloads<ITransactionElement>[] = [];

  while (missing.length > 0) {
    const chainId = hdrs[0].chainId;
    const pays = await payloads(
      chainId,
      hdrs.map((x) => x.payloadHash),
      'json',
      network,
      host,
      retryOptions,
    );

    // Note that in worst case a server may return only one payload at a time thus starving the
    // client. Well, chainweb nodes don't behave that way :-)
    if (pays.length === 0) {
      throw new Error(
        `failed to get payloads for some headers. Missing ${missing.map(
          (h) => ({ hash: h.hash, height: h.height }),
        )}`,
      );
    }

    // index payloads by payloadHash
    const paysMap = pays.reduce((m, c) => {
      m[c.payloadHash] = c as unknown as IBlockPayloadMap<ITransactionElement>;
      return m;
    }, {} as { [key: string]: IBlockPayloadMap<ITransactionElement> });

    // assign payload to headers
    missing = missing.filter((hdr, i) => {
      const pay = paysMap[hdr.payloadHash];
      if (pay) {
        result.push({
          header: hdr,
          payload: pay,
        });
        return false;
      } else {
        return true;
      }
    });
  }
  return result;
}

/**
 * Blocks from a range of block heights
 *
 * @param chainId - a chain id that is valid for the network
 * @param start - start block height
 * @param end - end block height
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function blocks(
  chainId: number | string,
  start: number,
  end: number,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<IBlockPayloads<ITransactionElement>[]> {
  const hdrs = await headers(chainId, start, end, network, host);
  return headers2blocks(hdrs, network, host);
}

/**
 * Recent Blocks
 *
 * @param chainId - a chain id that is valid for the network
 * @param depth - confirmation depth. Only blocks at this depth are returned
 * @param n - maximual number of blocks that are returned. The actual number of returned blocks may be lower.
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function recentBlocks(
  chainId: number | string,
  depth: number,
  n: number,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<IBlockPayloads<ITransactionElement>[]> {
  const hdrs = await recentHeaders(chainId, depth, n, network, host);
  let ro: IRetryOptions = {};
  if (depth <= 1) {
    ro = { retry404: true, minTimeout: 1000 };
  }
  return headers2blocks(hdrs, network, host, ro);
}

/**
 * Callback for processing individual items of a block stream
 *
 * @callback blockCallback
 * @param {Object} block - block object
 */

/**
 * Apply callback to new blocks.
 *
 * @param depth - confirmation depth at which blocks are yielded
 * @param chainIds - array of chainIds from which blocks are included
 * @param callback - function that is called for each block
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function blockStream(
  depth: number,
  chainIds: number[],
  callback: (block: IBlockPayloads<ITransactionElement>) => void,
  network: string = 'mainnet01  ',
  host: string = 'https://api.chainweb.com',
): Promise<EventSource> {
  const ro: IRetryOptions =
    depth > 1 ? {} : { retry404: true, minTimeout: 1000 };
  const cb = async (hdr: IBlockHeader): Promise<void> => {
    try {
      const blocks = await headers2blocks([hdr], network, host, ro);
      callback(blocks[0]);
    } catch (err) {
      console.log(err);
    }
  };
  return headerStream(depth, chainIds, cb, network, host);
}

/**
 * Query block header by its block hash
 *
 * @param chainId - a chain id that is valid for the network
 * @param hash  - block hash
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function blockByBlockHash(
  chainId: number | string,
  hash: string,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<IBlockPayloads<ITransactionElement>> {
  const hdr = await headerByBlockHash(chainId, hash, network, host);
  const bs = await headers2blocks([hdr], network, host);
  return bs[0];
}

/**
 * Query block by its height
 *
 * @param chainId - a chain id that is valid for the network
 * @param height - block height
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function blockByHeight(
  chainId: number | string,
  height: number,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<IBlockPayloads<ITransactionElement>> {
  const x = await blocks(chainId, height, height, network, host);
  return x[0];
}
