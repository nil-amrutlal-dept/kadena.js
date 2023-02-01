import { builder } from '../builder';

export default builder.prismaNode('Event', {
  id: { field: 'blockHash_idx_requestkey' },
  fields: (t) => ({
    // database fields
    qualname: t.exposeString('qualname'),
    chainid: t.field({
      type: 'String',
      resolve(parent) {
        return parent.chainid.toString();
      },
    }),
    idx: t.field({
      type: 'String',
      resolve(parent) {
        return parent.idx.toString();
      },
    }),
    module: t.exposeString('module'),
    modulehash: t.exposeString('modulehash'),
    name: t.exposeString('name'),
    params: t.field({
      type: 'String',
      resolve(parent) {
        return JSON.stringify(parent.params);
      },
    }),
  }),
});
