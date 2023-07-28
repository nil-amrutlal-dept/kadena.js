import { Box, Heading, Text, useModal } from '@kadena/react-ui';

import { itemLinkClass, staticResultsListClass } from '../styles.css';
import type { IQueryResult } from '../../../types';

import { filePathToRoute } from '@/pages/api/semanticsearch';
import Link from 'next/link';
import React, { FC } from 'react';

interface IProps {
  results: IQueryResult[];
  limitResults?: number;
}

interface IResultProps {
  item: IQueryResult;
}

interface IBreadCrumbProps {
  url: string;
}

const ItemBreadCrumb: FC<IBreadCrumbProps> = ({ url }) => {
  const urlArray = url.split('/');

  return (
    <>
      {urlArray.map((str, idx) => {
        return (
          <Text size="sm" bold={idx === 0} key={str + idx}>
            {str} {idx < urlArray.length - 1 ? ' / ' : ''}
          </Text>
        );
      })}
    </>
  );
};

const Item: FC<IResultProps> = ({ item }) => {
  const { clearModal } = useModal();

  if (!item.filePath) return;

  const url = filePathToRoute(item.filePath);

  return (
    <li>
      <Link href={url} passHref legacyBehavior>
        <a className={itemLinkClass} onClick={clearModal}>
          <Heading color="primaryContrast" as="h5">
            {item.title}
          </Heading>
          <ItemBreadCrumb url={url} />

          <Text as="p">{item.description}</Text>
        </a>
      </Link>
    </li>
  );
};

export const StaticResults: FC<IProps> = ({ results, limitResults }) => {
  const limitedResults =
    limitResults !== undefined ? results.slice(0, limitResults) : results;

  return (
    <Box marginY="$10">
      <ul className={staticResultsListClass}>
        {limitedResults.map((item) => {
          return <Item item={item} key={item.filePath} />;
        })}
      </ul>
    </Box>
  );
};
