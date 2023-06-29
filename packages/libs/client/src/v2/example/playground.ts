/* istanbul ignore file */
// this module is just some example code to play with the client

import { getClient } from '../client/client';
import {
  commandBuilder,
  ICapabilityItem,
  ICommand,
  meta,
  payload,
  set,
  signer,
} from '../commandBuilder';
import { getModule, Pact } from '../pact';

const { coin } = Pact.modules;

interface IAdminCapability {
  (name: 'test.ADMIN'): ICapabilityItem;
}

interface ITest {
  changeAdmin: (
    from: string,
    to: string,
  ) => string & {
    capability: IAdminCapability;
  };
}

const test: ITest = getModule('coin');

const nonce = (input: string) => (cmd: Partial<ICommand>) => {
  return { nonce: `kjs ${new Date().toISOString()}` };
};

// use the payload type in the output cont/exec
// eslint-disable-next-line @rushstack/typedef-var
export const cmd = commandBuilder(
  payload.exec([
    coin.transfer('javad', 'albert', { decimal: '0.1' }),
    test.changeAdmin('albert', 'javad'),
  ]),
  signer('javadPublicKey', (withCapability) => [
    //
    withCapability('coin.GAS'),
    withCapability('coin.TRANSFER', 'javad', 'albert', { decimal: '0.1' }),
  ]),
  signer('albertPublicKey', (withCapability) => [
    //
    withCapability('test.ADMIN'),
  ]),
  meta({ chainId: '1' }),
  nonce('kms'),
  set('networkId', 'mainnet04'),
);

export const cmd2 = commandBuilder(
  payload.cont({}),
  signer('javadPublicKey', (withCapability) => [
    //
    withCapability('coin.GAS'),
    withCapability('coin.TRANSFER', 'javad', 'albert', { decimal: '0.1' }),
  ]),
  signer('albertPublicKey', (withCapability) => [
    //
    withCapability('test.ADMIN'),
  ]),
  meta({ chainId: '1' }),
  nonce('kms'),
  set('networkId', 'mainnet04'),
);

const commandWithSignatures = {
  cmd: JSON.stringify(cmd),
  hash: 'str',
  sigs: [''],
};

const getHostUrl = (networkId: string, chainId: string) => {
  switch (networkId) {
    case 'devnet':
      return `http://localhost/${chainId}/pact`;
    case 'l2network':
      return `http://the-l2-server/${chainId}/pact`;
    case 'mainnet01':
      return `https://api.chainweb.com/chainweb/0.0/mainnet01/chain/${chainId}/pact`;
    case 'testnet04':
      return `https://api.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`;
    default:
      throw new Error(`UNKNOWN_NETWORK_ID: ${networkId}`);
  }
};

const { local, submit, pollStatus, pollSpv: pollSpv } = getClient(getHostUrl);

async function localExample() {
  const result = await local(commandWithSignatures);
  return result;
}

async function submitExample() {
  const [requestKeys, poll] = await submit([commandWithSignatures]);
  console.log(requestKeys);
  const result = await poll({
    onPoll: (requestKey) => {
      console.log('polling status of', requestKey);
    },
  });

  return result;
}

async function pollRequestsAndWaitForEachPromiseExample() {
  const someRequestKeys = ['key1', 'key2'];
  const results = pollStatus(someRequestKeys, {
    networkId: 'testnet04',
    chainId: '01',
    onPoll: (requestKey) => {
      console.log('polling status of', requestKey);
    },
  });

  Object.entries(results.requests).map(([requestKey, promise]) =>
    promise
      .then((data) => {
        console.log('the request ', requestKey, 'result:', data);
      })
      .catch((error) => {
        console.log(
          'error while getting the status of ',
          requestKey,
          'error:',
          error,
        );
      }),
  );
}

async function spvExample() {
  const someRequestKeys = 'key1';
  const status = await pollSpv(someRequestKeys, '01', {
    networkId: 'testnet04',
    chainId: '01',
  });
  return status;
}

function composeCommands() {
  const mainnetConfig = commandBuilder(
    meta({ chainId: '1' }),
    set('networkId', 'mainnet04'),
  );

  const transfer = commandBuilder(
    payload.exec([coin.transfer('javad', 'albert', { decimal: '0.1' })]),
    signer('javadPublicKey', (withCapability) => [
      withCapability('coin.GAS'),
      withCapability('coin.TRANSFER', 'javad', 'albert', { decimal: '0.1' }),
    ]),
  );

  return commandBuilder(mainnetConfig, transfer);
}
