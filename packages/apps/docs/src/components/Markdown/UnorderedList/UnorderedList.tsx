import { ulListClass, ulListClassName } from './styles.css';

import classNames from 'classnames';
import React, { FC, FunctionComponentElement } from 'react';

interface IProp {
  children: FunctionComponentElement<HTMLUListElement>[];
}

export const UnorderedList: FC<IProp> = ({ children }) => {
  return (
    <ul className={classNames(ulListClass, ulListClassName)}>{children}</ul>
  );
};
