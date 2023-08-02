import {
  ChainwebChainId,
  ChainwebNetworkId,
} from '@kadena/chainweb-node-client';
import { getClient, isSignedCommand, Pact } from '@kadena/client';
import { genKeyPair, sign } from '@kadena/cryptography-utils';
import { PactNumber } from '@kadena/pactjs';

import { getKadenaConstantByNetwork } from '@/constants/kadena';
import { env } from '@/utils/env';
import Debug from 'debug';

const NETWORK_ID: ChainwebNetworkId = 'testnet04';
const SENDER_ACCOUNT: string = 'coin-faucet';
const SENDER_OPERATION_ACCOUNT: string = 'faucet-operation';
const FAUCET_PUBLIC_KEY = env(
  'FAUCET_PUBLIC_KEY',
  '<PROVIDE_FAUCET_PUBLICKEY_HERE>',
);
const FAUCET_PRIVATE_KEY = env(
  'FAUCET_PRIVATE_KEY',
  '<PROVIDE_FAUCET_PRIVATEKEY_HERE>',
);

const debug = Debug('kadena-transfer:services:faucet');

export const fundExistingAccount = async (
  account: string,
  chainId: ChainwebChainId,
  amount = 100,
): Promise<unknown> => {
  debug(fundExistingAccount.name);
  const keyPair = genKeyPair();

  const transaction = Pact.builder
    .execution(
      Pact.modules['user.coin-faucet']['request-coin'](
        account,
        new PactNumber(amount).toPactDecimal(),
      ),
    )
    .addSigner(FAUCET_PUBLIC_KEY, (withCap) => [(withCap as any)('coin.GAS')])
    .addSigner(keyPair.publicKey, (withCap) => [
      (withCap as any)(
        'coin.TRANSFER',
        SENDER_ACCOUNT,
        account,
        new PactNumber(amount).toPactDecimal(),
      ),
    ])
    .setMeta({ sender: SENDER_OPERATION_ACCOUNT, chainId })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signature1 = sign(transaction.cmd, {
    publicKey: FAUCET_PUBLIC_KEY,
    secretKey: FAUCET_PRIVATE_KEY,
  });

  if (signature1.sig === undefined) {
    throw new Error('Failed to sign transaction');
  }

  const signature2 = sign(transaction.cmd, keyPair);

  if (signature2.sig === undefined) {
    throw new Error('Failed to sign transaction');
  }

  const apiHost = getKadenaConstantByNetwork('TESTNET').apiHost({
    networkId: NETWORK_ID,
    chainId,
  });

  transaction.sigs = [{ sig: signature1.sig }, { sig: signature2.sig }];

  const { submit, pollStatus } = getClient(apiHost);

  if (!isSignedCommand(transaction)) {
    throw new Error('Transaction is not signed');
  }

  const requestKeys = await submit(transaction);

  return await pollStatus(requestKeys);
};