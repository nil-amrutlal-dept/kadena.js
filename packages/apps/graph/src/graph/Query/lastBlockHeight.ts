import { prismaClient } from '../../db/prismaClient';
import { builder } from '../builder';

builder.queryField('lastBlockHeight', (t) => {
  return t.field({
    type: 'String',
    async resolve() {
      const lastBlock = await prismaClient.block.findFirst({
        orderBy: {
          height: 'desc',
        },
      });

      return lastBlock!.height.toString();
    },
  });
});
