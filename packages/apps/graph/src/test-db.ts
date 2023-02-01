import { prismaClient } from './db/prismaClient';

(async function () {
  const res = await prismaClient.transaction.findFirst({
    include: {
      block: true,
    },
    where: {
      events: {
        some: {
          qualname: {
            in: ['coin.TRANSFER'],
          },
        },
      },
    },
    // take: 1,
  });

  return res;
})()
  .then(console.log)
  .catch(console.error);
