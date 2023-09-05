import { activeLinkClass, linkClass } from './NavHeader.css';
import type { INavItem } from './NavHeaderNavigation';

import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';

export const NavHeaderLink: FC<INavItem> = ({
  active,
  children,
  href,
  target,
  onClick,
}) => {
  return (
    <a
      className={classNames(linkClass, {
        [activeLinkClass]: active,
        'nav-item': true,
      })}
      href={href}
      target={target}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
