import { recentBlocks, headers2blocks, blockByBlockHash } from './blocks';
import { blocks } from './blocks';
import { chainUpdates } from './headers';
import {
  IBlockHeader,
  IBlockPayloads,
  IEventData,
  ITransactionElement,
} from './types';

/**
 * Utility function to filter the events from an array of blocks
 *
 * @param blocks - a array of block payloads
 *
 * @alpha
 */
const filterEvents = (
  blocks: IBlockPayloads<ITransactionElement>[],
): IEventData[] => {
  return blocks
    .filter((x) => x.payload.transactions.length > 0)
    .flatMap((x) =>
      x.payload.transactions.flatMap((y) => {
        const es = y.output.events ? y.output.events : [];
        es.forEach((e) => (e.height = x.header.height));
        return es;
      }),
    );
};

/**
 * Events from a range of block heights
 *
 * @param chainId - a chain id that is valid for the network
 * @param start - start block height
 * @param end - end block height
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function events(
  chainId: number | string,
  start: number,
  end: number,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<IEventData[]> {
  const results = await blocks(chainId, start, end, network, host);
  return filterEvents(results);
}

/**
 * Recent Events
 *
 * @param chainId - a chain id that is valid for the network
 * @param depth - confirmation depth. Only events of blocks that this depth are returned
 * @param n - maximual number of blocks from which events are returned. The actual number of returned events may be lower.
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function recentEvents(
  chainId: number | string,
  depth: number,
  n: number,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<IEventData[]> {
  const results = await recentBlocks(chainId, depth, n, network, host);
  return filterEvents(results);
}

/**
 * Apply callback to new events.
 *
 * @param depth - confirmation depth at which blocks are yielded
 * @param chainIds - array of chainIds from which blocks are included
 * @param callback - function that is called for each event
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */

export function eventStream(
  depth: number,
  chainIds: number[],
  callback: (event: IEventData) => void,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<EventSource> {
  const ro = depth > 1 ? {} : { retry404: true, minTimeout: 1000 };
  const cb = async (u: {
    txCount: number;
    header: IBlockHeader;
  }): Promise<void> => {
    if (u.txCount > 0) {
      try {
        const blocks = await headers2blocks([u.header], network, host, ro);
        filterEvents(blocks).forEach(callback);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return chainUpdates(depth, chainIds, cb, network, host);
}

/**
 * Query events of a block by the block hash
 *
 * @param chainId - a chain id that is valid for the network
 * @param hash - block hash
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function eventsByBlockHash(
  chainId: number | string,
  hash: string,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<IEventData[]> {
  const block = await blockByBlockHash(chainId, hash, network, host);
  return filterEvents([block]);
}

/**
 * Query Events by height
 *
 * @param chainId - a chain id that is valid for the network
 * @param hash - block height
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export function eventsByHeight(
  chainId: number | string,
  height: number,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<IEventData[]> {
  return events(chainId, height, height, network, host);
}
