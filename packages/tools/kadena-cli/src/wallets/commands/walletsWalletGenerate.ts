import type { Command } from 'commander';
import { services } from '../../services/index.js';

import path from 'node:path';
import { writeAccountAliasMinimal } from '../../account/utils/createAccountConfigFile.js';
import { ACCOUNT_DIR } from '../../constants/config.js';
import { createCommand } from '../../utils/createCommand.js';
import { globalOptions, securityOptions } from '../../utils/globalOptions.js';
import { log } from '../../utils/logger.js';
import { relativeToCwd } from '../../utils/path.util.js';
import { walletOptions } from '../walletOptions.js';

/**
 * Creates a command to generate wallets.
 * @param {Command} program - The commander program.
 * @param {string} version - The version of the program.
 */
export const createGenerateWalletCommand: (
  program: Command,
  version: string,
) => void = createCommand(
  'add',
  'Add a new wallet',
  [
    walletOptions.walletName({ isOptional: false }),
    securityOptions.createPasswordOption({
      message: 'Enter the new wallet password',
      confirmPasswordMessage: 'Re-enter the password',
    }),
    globalOptions.legacy({ isOptional: true, disableQuestion: true }),
    walletOptions.walletAccountCreate(),
  ],
  async (option, { collect }) => {
    const config = await collect(option);
    log.debug('create-wallet:action', config);

    try {
      const { wallet, words } = await services.wallet.create({
        alias: config.walletName,
        legacy: config.legacy,
        password: config.passwordFile,
      });
      const key = await services.wallet.generateKey({
        seed: wallet.seed,
        legacy: wallet.legacy,
        password: config.passwordFile,
        index: 0,
      });
      await services.wallet.storeKey(wallet, key);

      log.output(log.generateTableString(['Mnemonic Phrase'], [[words]]));
      log.info(
        log.color.yellow(
          `\nPlease store the mnemonic phrase in a safe place. You will need it to recover your wallet.\n`,
        ),
      );
      log.output(
        log.generateTableString(
          ['Wallet Storage Location'],
          [[relativeToCwd(wallet.filepath)]],
        ),
      );
      if (config.walletAccountCreate) {
        const accountFilepath = path.join(ACCOUNT_DIR, `${wallet.alias}.yaml`);
        await writeAccountAliasMinimal(
          {
            accountName: `k:${wallet.keys[0].publicKey}`,
            fungible: 'coin',
            predicate: `keys-all`,
            publicKeysConfig: [wallet.keys[0].publicKey],
          },
          accountFilepath,
        );
        log.output(
          log.generateTableString(
            ['Account Storage Location'],
            [[relativeToCwd(accountFilepath)]],
          ),
        );
        // TODO: ask to fund created account
        // - prompt "Do you want to fund the account?"
        // - prompt network
        // - prompt chainId
      }
    } catch (error) {
      if (error instanceof Error) {
        log.error(error.message);
      }
    }
  },
);
