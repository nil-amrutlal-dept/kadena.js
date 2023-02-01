import { builder } from '../builder';

export default builder.prismaNode('Block', {
  id: { field: 'hash' },
  name: 'Block',
  fields: (t) => ({
    // database fields
    hash: t.exposeID('hash'),
    chainid: t.field({
      type: 'String',
      resolve(parent) {
        return parent.chainid.toString();
      },
    }),
    creationtime: t.expose('creationtime', { type: 'DateTime' }),
    epoch: t.expose('epoch', { type: 'DateTime' }),
    height: t.field({
      type: 'String',
      resolve(parent) {
        return parent.height.toString();
      },
    }),
    powhash: t.exposeString('powhash'),

    // computed fields

    // relations
    transactions: t.relatedConnection('transactions', {
      cursor: 'blockHash_requestkey',
      args: {
        events: t.arg.stringList({ required: false, defaultValue: [] }),
      },
      totalCount: true,

      query({ events }) {
        if (events && events.length > 0)
          return {
            where: {
              events: {
                some: {
                  qualname: {
                    in: events,
                  },
                },
              },
            },
          };
        return {};
      },
    }),
  }),
});
