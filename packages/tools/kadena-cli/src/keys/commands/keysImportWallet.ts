import type { EncryptedString } from '@kadena/hd-wallet';
import { kadenaMnemonicToSeed } from '@kadena/hd-wallet';
import { kadenaMnemonicToRootKeypair as legacykadenaMnemonicToRootKeypair } from '@kadena/hd-wallet/chainweaver';
import chalk from 'chalk';
import type { Command } from 'commander';
import debug from 'debug';
import ora from 'ora';
import path from 'path';

import type { CommandResult } from '../../utils/command.util.js';
import { assertCommandError } from '../../utils/command.util.js';
import { createCommand } from '../../utils/createCommand.js';
import { globalOptions } from '../../utils/globalOptions.js';
import { displayStoredWallet } from '../utils/keysDisplay.js';
import type { IWallet } from '../utils/keysHelpers.js';
import { getWallet } from '../utils/keysHelpers.js';
import * as storageService from '../utils/storage.js';

/**
kadena keys import-wallet --key-mnemonic "catch ridge print million media eternal sleep heavy inject before captain lazy" --security-new-password 12345678 --security-verify-password 12345678 --key-wallet "test"
*/

export const importWallet = async ({
  mnemonic,
  password,
  keyWallet,
  legacy,
}: {
  mnemonic: string;
  password: string;
  keyWallet: string;
  legacy?: boolean;
}): Promise<CommandResult<{ wallet: IWallet }>> => {
  const existing = await getWallet(keyWallet);

  if (existing !== null && existing.legacy === legacy) {
    return {
      success: false,
      errors: [`Wallet "${keyWallet}" already exists.`],
    };
  }

  const splitMnemonic = mnemonic
    .split(' ')
    .map((word) => word.trim())
    .filter((word) => word.length > 0);

  if (splitMnemonic.length !== 12) {
    // TODO: figure out if other word lengths need to be supported
    // if legacy it must be 12.
    return { success: false, errors: [`Mnemonic phrase must be 12 words.`] };
  }

  const validatedMnemonic = splitMnemonic.join(' ');
  let keySeed: EncryptedString;

  if (legacy === true) {
    keySeed = await legacykadenaMnemonicToRootKeypair(
      password,
      validatedMnemonic,
    );
  } else {
    keySeed = await kadenaMnemonicToSeed(password, validatedMnemonic);
  }

  const walletPath = await storageService.storeWallet(
    keySeed,
    keyWallet,
    legacy,
  );

  const wallet = await getWallet(path.basename(walletPath));

  if (!wallet) {
    return { success: false, errors: [`Failed to create wallet`] };
  }

  return { success: true, data: { wallet } };
};

export const createImportWalletCommand: (
  program: Command,
  version: string,
) => void = createCommand(
  'import-wallet',
  'import (restore) wallet from mnemonic phrase',
  [
    globalOptions.keyMnemonic(),
    globalOptions.securityNewPassword({ isOptional: false }),
    globalOptions.securityVerifyPassword({ isOptional: false }),
    globalOptions.keyWallet(),
    globalOptions.legacy({ isOptional: true, disableQuestion: true }),
  ],
  async (config) => {
    try {
      debug('import-wallet:action')({ config });

      // compare passwords
      if (config.securityNewPassword !== config.securityVerifyPassword) {
        console.log(chalk.red(`\nPasswords don't match. Please try again.\n`));
        process.exit(1);
      }

      const loading = ora('Generating..').start();

      const result = await importWallet({
        keyWallet: config.keyWallet,
        mnemonic: config.keyMnemonic,
        password: config.securityNewPassword,
        legacy: config.legacy,
      });

      assertCommandError(result, loading);

      displayStoredWallet(config.keyWallet, result.data.wallet.legacy);
    } catch (error) {
      console.log(chalk.red(`\n${error.message}\n`));
      process.exit(1);
    }
  },
);
