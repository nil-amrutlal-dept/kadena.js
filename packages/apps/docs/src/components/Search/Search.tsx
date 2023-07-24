import { SearchResults } from './components/SearchResults';

import { useSearch } from '@/hooks';
import { useSemanticSearch } from '@/hooks/useSearch/useSemanticSearch';
import React, { FC, useEffect, useState } from 'react';

interface IProps {
  query?: string;
  hasScroll?: boolean;
  limitResults?: number;
}

export const Search: FC<IProps> = ({ query, hasScroll, limitResults }) => {
  const [tabName, setTabName] = useState<string | undefined>();
  const {
    outputStream,
    handleSubmit: handleSearchSubmit,
    conversation,
    error,
    isLoading,
  } = useSearch();
  const {
    results: semanticResults,
    error: semanticError,
    isLoading: semanticIsLoading,
    handleSubmit: handleSemanticSubmit,
  } = useSemanticSearch(limitResults);

  useEffect(() => {
    if (query !== undefined && query.trim() !== '') {
      if (tabName === 'qa') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handleSearchSubmit(query);
      }
      if (tabName === 'docs') {
        handleSemanticSubmit(query);
      }
    }
  }, [query, tabName, handleSemanticSubmit, handleSearchSubmit]);

  const onTabSelect = (tabName: string): void => {
    setTabName(tabName);
  };

  return (
    <section>
      <SearchResults
        semanticResults={semanticResults}
        semanticError={semanticError}
        semanticIsLoading={semanticIsLoading}
        conversation={conversation}
        outputStream={outputStream}
        query={query}
        error={error}
        isLoading={isLoading}
        hasScroll={hasScroll}
        onTabSelect={onTabSelect}
        limitResults={limitResults}
      />
    </section>
  );
};
