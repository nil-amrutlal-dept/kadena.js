import { prismaClient } from '@db/prismaClient';
import { normalizeError } from '@utils/errors';
import { COMPLEXITY, builder } from '../builder';

export default builder.prismaNode('MinerKey', {
  id: { field: 'blockHash_key' },
  fields: (t) => ({
    // database fields
    blockHash: t.exposeString('blockHash'),
    key: t.exposeString('key'),

    //relations
    block: t.prismaField({
      type: 'Block',
      nullable: false,
      complexity: COMPLEXITY.FIELD.PRISMA_WITHOUT_RELATIONS,
      async resolve(query, parent) {
        try {
          return await prismaClient.block.findUniqueOrThrow({
            ...query,
            where: {
              hash: parent.blockHash,
            },
          });
        } catch (error) {
          throw normalizeError(error);
        }
      },
    }),
  }),
});
