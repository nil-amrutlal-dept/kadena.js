import { prismaClient } from '../../db/prismaClient';
import { builder } from '../builder';

export default builder.prismaNode('Event', {
  id: { field: 'block_idx_requestkey' },
  fields: (t) => ({
    // database fields
    id_gen: t.expose('id', { type: 'Int' }),
    chainId: t.expose('chainid', { type: 'BigInt' }),
    height: t.expose('height', { type: 'BigInt' }),
    index: t.expose('idx', { type: 'BigInt' }),
    module: t.exposeString('module'),
    name: t.exposeString('name'),
    qualName: t.exposeString('qualname'),
    paramText: t.exposeString('paramtext'),
    requestKey: t.exposeString('requestkey'),
    parameters: t.field({
      type: 'String',
      resolve(parent) {
        return JSON.stringify(parent.params);
      },
    }),

    //relations
    transaction: t.prismaField({
      type: 'Transaction',
      nullable: true,
      resolve(query, parent, args, context, info) {
        return prismaClient.transaction.findUnique({
          where: {
            requestkey: parent.requestkey,
            block: parent.block,
          },
        });
      },
    }),

    block: t.prismaField({
      type: 'Block',
      nullable: true,
      // eslint-disable-next-line @typescript-eslint/typedef
      resolve(query, parent, args, context, info) {
        return prismaClient.block.findUnique({
          where: {
            hash: parent.block,
          },
        });
      },
    }),
  }),
});
