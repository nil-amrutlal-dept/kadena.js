import { Heading, Stack } from '@kadena/react-components';

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
        <Heading as="h2">Chainweb</Heading>
      </div>
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      leftMenuTree: checkSubTreeForActive(getPathName(__filename)),
      frontmatter: {
        title: 'Intro to Chainweb',
        menu: 'Chainweb',
        subTitle: 'Build the future on Kadena',
        label: 'Introduction',
        order: 5,
        description: 'Welcome to Chainwebs documentation!',
        layout: 'landing',
        icon: 'QuickStart',
      },
    },
  };
};

export default Home;
