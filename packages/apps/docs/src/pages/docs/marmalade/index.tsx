import { Stack } from '@kadena/react-components';
import { Heading } from '@kadena/react-ui';

import {
  checkSubTreeForActive,
  getPathName,
} from '@/utils/staticGeneration/checkSubTreeForActive.mjs';
import { GetStaticProps } from 'next';
import React, { FC } from 'react';

const Home: FC = () => {
  return (
    <Stack direction="column" spacing="2xl">
      <div>
        <Heading as="h2">Marmalade</Heading>
      </div>
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      leftMenuTree: checkSubTreeForActive(getPathName(__filename)),
      frontmatter: {
        title: 'Intro to Marmalade',
        menu: 'Marmalade',
        subTitle: 'Mint a marketplace',
        label: 's',
        order: 6,
        description: 'Mint a marketplace',
        layout: 'landing',
        icon: 'Marmalade',
      },
    },
  };
};

export default Home;
