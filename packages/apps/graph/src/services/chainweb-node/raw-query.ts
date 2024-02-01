import { dirtyReadClient } from '@kadena/client-utils/core';
import { ChainId } from '@kadena/types';
import { dotenv } from '@utils/dotenv';
import { CommandData, PactCommandError } from './utils';

export async function sendRawQuery(
  code: string,
  chainId: string,
  data?: CommandData[],
): Promise<string> {
  let result;
  try {
    result = await dirtyReadClient({
      host: dotenv.NETWORK_HOST,
      defaults: {
        networkId: dotenv.NETWORK_ID,
        meta: { chainId: chainId as ChainId },
        payload: {
          exec: {
            code,
            data:
              data?.reduce(
                (acc, obj) => {
                  acc[obj.key] = obj.value;
                  return acc;
                },
                {} as Record<string, unknown>,
              ) || {},
          },
        },
      },
    })().execute();

    return JSON.stringify(result);
  } catch (error) {
    throw new PactCommandError('Pact Command failed with error', error);
  }
}
