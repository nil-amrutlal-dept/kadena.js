import { Box, Stack } from '@kadena/react-ui';

import type { QueryTransactionsConnection } from '@/__generated__/sdk';
import {
  useGetBlocksSubscription,
  useGetRecentHeightsQuery,
  useGetTransactionsQuery,
} from '@/__generated__/sdk';
import { centerBlockStyle } from '@/components/common/center-block/styles.css';
import { CompactTransactionsTable } from '@/components/compact-transactions-table/compact-transactions-table';
import { GraphQLQueryDialog } from '@/components/graphql-query-dialog/graphql-query-dialog';
import LoaderAndError from '@/components/loader-and-error/loader-and-error';
import { getRecentHeights, getTransactions } from '@/graphql/queries.graph';
import { getBlocksSubscription } from '@/graphql/subscriptions.graph';
import { ChainwebGraph } from '@components/chainweb';
import routes from '@constants/routes';
import { useChainTree } from '@context/chain-tree-context';
import { useParsedBlocks } from '@utils/hooks/use-parsed-blocks';
import { usePrevious } from '@utils/hooks/use-previous';
import isEqual from 'lodash.isequal';
import React, { useEffect } from 'react';

const Home: React.FC = () => {
  const {
    loading: loadingNewBlocks,
    data: newBlocks,
    error: newBlocksError,
  } = useGetBlocksSubscription();
  const getRecentHeightsVariables = { count: 3 };
  const { data: recentBlocks, error: recentBlocksError } =
    useGetRecentHeightsQuery({ variables: getRecentHeightsVariables });
  const previousNewBlocks = usePrevious(newBlocks);
  const previousRecentBlocks = usePrevious(recentBlocks);

  const getTransactionsVariables = { first: 10 };
  const { data: txs, error: txError } = useGetTransactionsQuery({
    variables: getTransactionsVariables,
  });

  const { allBlocks, addBlocks } = useParsedBlocks();

  const { addBlockToChain } = useChainTree();

  useEffect(() => {
    if (
      isEqual(previousNewBlocks, newBlocks) === false &&
      newBlocks?.newBlocks &&
      newBlocks?.newBlocks?.length > 0
    ) {
      newBlocks.newBlocks.forEach(async (block) => {
        addBlockToChain(block);
      });
      addBlocks(newBlocks?.newBlocks);
    }
  }, [newBlocks, addBlocks, previousNewBlocks, addBlockToChain]);

  useEffect(() => {
    if (
      isEqual(previousRecentBlocks, recentBlocks) === false &&
      recentBlocks?.completedBlockHeights &&
      recentBlocks?.completedBlockHeights?.length > 0
    ) {
      recentBlocks.completedBlockHeights.forEach(async (block) => {
        addBlockToChain(block);
      });

      addBlocks(recentBlocks?.completedBlockHeights);
    }
  }, [recentBlocks, addBlocks, previousRecentBlocks, addBlockToChain]);

  return (
    <>
      <Stack justifyContent="flex-end">
        <GraphQLQueryDialog
          queries={[
            { query: getBlocksSubscription },
            { query: getRecentHeights, variables: getRecentHeightsVariables },
            { query: getTransactions, variables: getTransactionsVariables },
          ]}
        />
      </Stack>

      <LoaderAndError
        error={newBlocksError || recentBlocksError || txError}
        loading={loadingNewBlocks}
        loaderText="Loading..."
      />

      <div className={centerBlockStyle}>
        {allBlocks && <ChainwebGraph blocks={allBlocks} />}
      </div>

      {txs?.transactions && (
        <div>
          <Box margin="md" />
          <CompactTransactionsTable
            transactions={txs.transactions as QueryTransactionsConnection}
            viewAllHref={`${routes.TRANSACTIONS}`}
            description="Most recent transactions"
          />
        </div>
      )}
    </>
  );
};

export default Home;
