import { prismaClient } from '@db/prismaClient';
import { normalizeError } from '@utils/errors';
import { COMPLEXITY, builder } from '../builder';
import Block from '../objects/Block';

builder.queryField('block', (t) => {
  return t.prismaField({
    args: {
      hash: t.arg.string({ required: true }),
    },
    type: Block,
    nullable: true,
    complexity: COMPLEXITY.FIELD.PRISMA_WITHOUT_RELATIONS,
    async resolve(query, __parent, args) {
      try {
        const block = await prismaClient.block.findUnique({
          ...query,
          where: {
            hash: args.hash,
          },
        });

        return block;
      } catch (error) {
        throw normalizeError(error);
      }
    },
  });
});
