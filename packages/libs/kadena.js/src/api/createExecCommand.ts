import type {
  EnvData,
  IKeyPair,
  IMetaData,
  NetworkId,
  Nonce,
  PactCode,
  ISendRequestBody,
} from '@kadena/types';

import { createSendRequest } from './createSendRequest';
import { prepareExecCommand } from './prepareExecCommand';
/**
 * Make a full 'send' endpoint exec command. See 'prepareExecCommand' for parameters.
 */
export function createExecCommand(
  keyPairs: Array<IKeyPair>,
  nonce: Nonce,
  pactCode: PactCode,
  envData: EnvData,
  meta: IMetaData,
  networkId?: NetworkId,
): ISendRequestBody {
  return createSendRequest([
    prepareExecCommand(keyPairs, nonce, pactCode, envData, meta, networkId),
  ]);
}
