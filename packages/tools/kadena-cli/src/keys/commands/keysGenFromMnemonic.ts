import type { EncryptedString } from '@kadena/hd-wallet';
import { kadenaEncrypt, kadenaMnemonicToSeed } from '@kadena/hd-wallet';
import { kadenaMnemonicToRootKeypair as legacykadenaMnemonicToRootKeypair } from '@kadena/hd-wallet/chainweaver';
import chalk from 'chalk';
import type { Command } from 'commander';
import debug from 'debug';
import { createCommand } from '../../utils/createCommand.js';
import { globalOptions } from '../../utils/globalOptions.js';
import type { IKeysConfig } from '../utils/keySharedKeyGen.js';
import { generateFromSeed } from '../utils/keySharedKeyGen.js';
import {
  displayGeneratedPlainKeys,
  printStoredPlainKeys,
} from '../utils/keysDisplay.js';
import * as storageService from '../utils/storage.js';

import ora from 'ora';
import { clearCLI } from '../../utils/helpers.js';

export const createGenerateFromMnemonic: (
  program: Command,
  version: string,
) => void = createCommand(
  'from-mnemonic',
  'create key(s) from mnemonic phrase',
  [
    globalOptions.keyGenFromChoice(),
    globalOptions.keyMnemonic(),
    globalOptions.keyPassword(),
    globalOptions.keyAlias(),
    globalOptions.keyAmount({ isOptional: true }),
    globalOptions.legacy({ isOptional: true, disableQuestion: true }),
  ],
  async (config) => {
    clearCLI();
    try {
      debug('generate-from-mnemonic:action')({ config });

      const loading = ora('Generating..').start();
      try {
        let keySeed: EncryptedString | undefined;

        if (config.legacy === true) {
          const buffer = await legacykadenaMnemonicToRootKeypair(
            config.keyPassword,
            config.keyMnemonic,
          );
          keySeed = kadenaEncrypt(config.keyPassword, buffer);
        } else {
          keySeed = await kadenaMnemonicToSeed(
            config.keyPassword,
            config.keyMnemonic,
          );
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { keyMnemonic, keyGenFromChoice, ...rest } = config;
        const result = {
          ...rest,
          keySeed: keySeed as EncryptedString,
          keyGenFromChoice,
        };
        const keys = await generateFromSeed(result as IKeysConfig);

        loading.succeed('Completed');
        displayGeneratedPlainKeys(keys);

        await storageService.savePlainKeyByAlias(config.keyAlias, keys, false);
        printStoredPlainKeys(config.keyAlias, keys, false);
      } catch (error) {
        loading.fail('Operation failed');
        console.error(
          `Error: ${error instanceof Error ? error.message : error}`,
        );
      }
    } catch (error) {
      console.log(chalk.red(`\n${error.message}\n`));
      process.exit(1);
    }
  },
);
