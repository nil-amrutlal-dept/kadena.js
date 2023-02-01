import { prismaClient } from '../../db/prismaClient';
import { builder } from '../builder';

export default builder.prismaNode('Transaction', {
  id: { field: 'blockHash_requestkey' },
  fields: (t) => ({
    // database fields
    reqKey: t.exposeString('requestkey', {
      deprecationReason: 'Use requestkey instead',
    }),
    nonce: t.exposeString('nonce'),
    code: t.exposeString('code', { nullable: true }),
    data: t.field({
      type: 'String',
      nullable: true,
      resolve(parent) {
        return JSON.stringify(parent.data);
      },
    }),
    gas: t.expose('gas', { type: 'BigInt' }),

    // computed fields

    // relations
    block: t.relation('block'),
    events: t.relation('events'),
  }),
});
