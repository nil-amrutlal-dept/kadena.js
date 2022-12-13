import {
  recentBlocks,
  blocks,
  headers2blocks,
  blockByBlockHash,
} from './blocks';
import { chainUpdates } from './headers';
import {
  IBlockHeader,
  IBlockPayloads,
  IRetryOptions,
  ITransactionElement,
} from './types';

/**
 * Utility function to filter the transactions from an array of blocks
 *
 * @param blocks - a array of block payloads
 *
 * @alpha
 */
const filterTxs = (
  blocks: IBlockPayloads<ITransactionElement>[],
): ITransactionElement[] => {
  return blocks
    .filter((x) => x.payload.transactions.length > 0)
    .flatMap((x) => {
      const txs = x.payload.transactions;
      txs.forEach((tx) => (tx.height = x.header.height));
      return txs;
    });
};

/**
 * Transactions from a range of block heights
 *
 * @param chainId - a chain id that is valid for the network
 * @param start - start block height
 * @param end - end block height
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function txs(
  chainId: number | string,
  start: number,
  end: number,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<ITransactionElement[]> {
  const x = await blocks(chainId, start, end, network, host);
  return filterTxs(x);
}

/**
 * Recent Transactions
 *
 * @param chainId - a chain id that is valid for the network
 * @param depth - confirmation depth. Only transactions of blocks that this depth are returned
 * @param n - maximual number of blocks from which transactions are returned. The actual number of returned transactions may be lower
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function recentTxs(
  chainId: number | string,
  depth: number = 0,
  n: number = 1,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<ITransactionElement[]> {
  const x = await recentBlocks(chainId, depth, n, network, host);
  return filterTxs(x);
}

/**
 * Apply callback to new transactions.
 *
 * @param depth - confirmation depth at which blocks are yielded
 * @param chainIds - array of chainIds from which blocks are included
 * @param callback - function that is called for each transaction
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function txStream(
  depth: number,
  chainIds: number[],
  callback: (transaction: ITransactionElement) => void,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<EventSource> {
  const ro: IRetryOptions =
    depth > 1 ? {} : { retry404: true, minTimeout: 1000 };
  const cb = async (u: {
    txCount: number;
    header: IBlockHeader;
  }): Promise<void> => {
    if (u.txCount > 0) {
      const blocks = await headers2blocks([u.header], network, host, ro);
      filterTxs(blocks).forEach(callback);
    }
  };
  return await chainUpdates(depth, chainIds, cb, network, host);
}

/**
 * Query transactions of a block by the block hash
 *
 * @param chainId - a chain id that is valid for the network
 * @param hash - block hash
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */

export async function txsByBlockHash(
  chainId: number | string,
  hash: string,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<ITransactionElement[]> {
  const block = await blockByBlockHash(chainId, hash, network, host);
  return filterTxs([block]);
}

/**
 * Query transactions by height
 *
 * @param chainId - a chain id that is valid for the network
 * @param hash - block height
 * @param network - chainweb network
 * @param host - chainweb api host
 *
 * @alpha
 */
export async function txsByHeight(
  chainId: number | string,
  height: number,
  network: string = 'mainnet01',
  host: string = 'https://api.chainweb.com',
): Promise<ITransactionElement[]> {
  return txs(chainId, height, height, network, host);
}
