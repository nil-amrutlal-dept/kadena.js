import Container from './GridContainer';
import Item from './GridItem';
import { IGridContainer, IGridItem } from './types';

import { FC } from 'react';

interface IGrid {
  Container: FC<IGridContainer>;
  Item: FC<IGridItem>;
}

export { IGridContainer, IGridItem };
export const Grid: IGrid = { Container, Item };
