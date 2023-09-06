import type { INavHeaderRootProps } from './NavHeader';
import { NavHeaderContainer } from './NavHeader';
import type { INavHeaderContentProps } from './NavHeaderContent';
import { NavHeaderContent } from './NavHeaderContent';
import { NavHeaderLink, type INavHeaderLinkProps } from './NavHeaderLink';
import type { INavHeaderNavigationProps } from './NavHeaderNavigation';
import { NavHeaderNavigation } from './NavHeaderNavigation';

import type { FC } from 'react';

export {
  INavHeaderRootProps,
  INavHeaderContentProps,
  INavHeaderLinkProps,
  INavHeaderNavigationProps,
};

export interface INavHeaderProps {
  Root: FC<INavHeaderRootProps>;
  Navigation: FC<INavHeaderNavigationProps>;
  Link: FC<INavHeaderLinkProps>;
  Content: FC<INavHeaderContentProps>;
}

export const NavHeader: INavHeaderProps = {
  Root: NavHeaderContainer,
  Navigation: NavHeaderNavigation,
  Link: NavHeaderLink,
  Content: NavHeaderContent,
};
