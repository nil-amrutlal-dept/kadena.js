import { prismaClient } from '../../db/prismaClient';
import { builder } from '../builder';

builder.queryField('lastBlockHeight', (t) => {
  return t.field({
    type: 'BigInt',
    nullable: true,
    resolve: async () => {
      const lastBlock = await prismaClient.block.findFirst({
        orderBy: {
          height: 'desc',
        },
      });

      return lastBlock?.height;
    },
  });
});
