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
    gas: t.field({
      type: 'String',
      resolve(parent) {
        return parent.gas.toString();
      },
    }),

    // computed fields

    // relations
    block: t.relation('block'),
    events: t.relation('events'),
  }),
});
