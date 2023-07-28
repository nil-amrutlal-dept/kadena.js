import { sprinkles } from '@kadena/react-ui/theme';

import { style } from '@vanilla-extract/css';

export const container = style([
  sprinkles({
    margin: '$4',
  }),
  {
    background: '#ccc',
  },
]);
