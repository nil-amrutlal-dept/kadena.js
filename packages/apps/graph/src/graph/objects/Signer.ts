import { nullishOrEmpty } from '@utils/nullishOrEmpty';
import { builder } from '../builder';

export default builder.prismaNode('Signer', {
  description: 'Information about a public key that can sign transactions.',
  id: { field: 'requestKey_orderIndex' },
  fields: (t) => ({
    //database fields
    address: t.exposeString('address', { nullable: true }),
    capabilities: t.string({
      nullable: true,
      resolve({ capabilities }) {
        return nullishOrEmpty(capabilities)
          ? undefined
          : JSON.stringify(capabilities);
      },
    }),
    orderIndex: t.exposeInt('orderIndex'),
    publicKey: t.exposeString('publicKey'),
    requestKey: t.exposeString('requestKey'),
    scheme: t.exposeString('scheme', {
      nullable: true,
      description: 'The signature scheme that was used to sign.',
    }),
    signature: t.exposeString('signature'),
  }),
});
