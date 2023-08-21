import {
  articleClass,
  contentClass,
  contentClassVariants,
} from '../components';
import { Template } from '../components/Template';

import { CodeBackground, PageGrid } from './styles';

import { BottomPageSection } from '@/components/BottomPageSection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastModifiedDate } from '@/components/LastModifiedDate';
import { IPageProps } from '@/types/Layout';
import classNames from 'classnames';
import React, { FC } from 'react';
import { RedocRawOptions } from 'redoc';

export const options: RedocRawOptions = {
  pathInMiddlePanel: true,
  disableSearch: true,
  hideDownloadButton: true,
  hideFab: true,

  theme: {
    breakpoints: {
      small: '1024px',
      medium: '1280px',
      large: '1440px',
    },
    sidebar: {
      backgroundColor: 'transparent',
    },

    rightPanel: {
      backgroundColor: 'transparent',
      width: '400px',
    },
    codeBlock: {
      backgroundColor: 'black',
    },
    colors: {
      primary: {
        main: 'RGB(218,52,140)', // Kadena pink
      },
    },
  },
  expandResponses: '200,201,204',
};

export const Redocly: FC<IPageProps> = ({
  children,
  frontmatter,
  leftMenuTree,
}) => {
  return (
    <PageGrid>
      <Template menuItems={leftMenuTree}>
        <div
          className={classNames(contentClass, contentClassVariants.code)}
          id="maincontent"
        >
          <article className={articleClass}>
            <Breadcrumbs menuItems={leftMenuTree} />
            <LastModifiedDate date={frontmatter.lastModifiedDate} />
            {children}
            <BottomPageSection
              editLink={frontmatter.editLink}
              navigation={frontmatter.navigation}
              layout="code"
            />
          </article>
        </div>
        <CodeBackground />
      </Template>
    </PageGrid>
  );
};

Redocly.displayName = 'Redocly';
