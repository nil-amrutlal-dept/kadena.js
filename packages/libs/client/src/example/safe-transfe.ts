/* istanbul ignore file */
// this module is just a code snippet for the safe transfer

import { ICommandResult } from '@kadena/chainweb-node-client';

import { getClient } from '../client/client';
import { ICoin } from '../createPactCommand/test/coin-contract';
import { getModule, Pact } from '../pact';
import { quicksign } from '../sign';

const coin: ICoin = getModule('coin');

const getHostUrl = (networkId: string, chainId: string): string =>
  `http://localhost:8080/chainweb/0.0/${networkId}/chain/${chainId}/pact`;

const { submit, pollStatus } = getClient(getHostUrl);

export async function doSafeTransfer(
  from: { account: string; publicKey: string },
  to: { account: string; publicKey: string },
  amount: string,
): Promise<Record<string, ICommandResult>> {
  const unsignedTr = Pact.builder
    .execute(
      // the first two transfers are to make sure the receiver has also signed the command
      coin.transfer(from.account, to.account, { decimal: '1' }),
      coin.transfer(to.account, from.account, { decimal: '1' }),
      // the actual transfer
      coin.transfer(from.account, to.account, { decimal: amount }),
    )
    .addSigner(from.publicKey, (withCapability) => [
      withCapability('coin.TRANSFER', from.account, to.account, {
        decimal: (Number(amount) + 1).toString(),
      }),
    ])
    .addSigner(to.publicKey, (withCapability) => [
      withCapability('coin.TRANSFER', to.account, from.account, {
        decimal: '1',
      }),
    ])
    .setNetworkId('mainnet01')
    .setMeta({ chainId: '1' })
    .setNonce('tadasd')
    .createTransaction();

  const signedCommand = await quicksign(unsignedTr);

  const receivedKeys = await submit(signedCommand);
  const status = await pollStatus(receivedKeys);

  return status;
}
