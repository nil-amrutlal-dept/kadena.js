import type { ChainId } from '@kadena/client';
import { devnetConfig } from '../config';
import { crossChainTransfer } from '../crosschain-transfer';
import { getBalance } from '../get-balance';
import type { IAccount } from '../helper';
import {
  generateAccount,
  getRandomNumber,
  getRandomOption,
  isEqualChainAccounts,
  logger,
  seedRandom,
  sender00,
  stringifyProperty,
} from '../helper';
import { safeTransfer } from '../safe-transfer';
import { transfer } from '../transfer';
import type { TransferType } from './file';
import { appendToFile, createFile } from './file';

const simualtionTransferOptions: TransferType[] = [
  'xchaintransfer',
  'transfer',
  'safe-transfer',
];

export async function simulate({
  numberOfAccounts = 6,
  transferInterval = 100,
  maxAmount = 25,
  tokenPool = 1000000,
  seed = Date.now().toString(),
  duration = 28800000,
  maxTransfers = 10000,
}: {
  numberOfAccounts: number;
  transferInterval: number;
  maxAmount: number;
  tokenPool: number;
  seed: string;
  duration: number;
  maxTransfers: number;
}): Promise<void> {
  const accounts: IAccount[] = [];

  // Parameters validation check
  if (tokenPool < maxAmount) {
    logger.info(
      'The max transfer amount cant be greater than the total token pool',
    );
    return;
  }

  if (numberOfAccounts <= 1) {
    logger.info('Number of accounts must be greater than 1');
    return;
  }

  logger.info('Seed value: ', seed);
  const filepath = createFile('testdata.csv');

  try {
    // Create accounts
    for (let i = 0; i < numberOfAccounts; i++) {
      // This will determine if the account has 1 or 2 keys (even = 1 key, odd = 2 keys)
      const noOfKeys = i % 2 === 0 ? 1 : 2;
      const account = await generateAccount(noOfKeys);
      logger.info(
        `Generated KeyPair\nAccount: ${
          account.account
        }\nPublic Key: ${stringifyProperty(
          account.keys,
          'publicKey',
        )}\nSecret Key: ${stringifyProperty(account.keys, 'secretKey')}\n`,
      );

      if (accounts.includes(account)) {
        throw Error('Duplicate account');
      }
      accounts.push(account);

      // Fund account
      const result = await transfer({
        receiver: account,
        amount: tokenPool / numberOfAccounts,
      });

      appendToFile(filepath, {
        timestamp: Date.now(),
        from: 'sender00',
        to: account.account,
        amount: tokenPool / numberOfAccounts,
        requestKey: result.reqKey,
        type: 'fund',
      });
    }

    // Generate first seeded random number
    let seededRandomNo = seedRandom(seed);
    let counter: number = 0;
    let totalTransfers: number = 0;

    logger.info(`Simulating transfers for ${duration}ns`);
    const startTime = Date.now();

    // While the duration has not been reached and the max transfers has not been reached

    while (Date.now() - startTime < duration && totalTransfers < maxTransfers) {
      // Transfer between accounts
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        const amount: number = getRandomNumber(seededRandomNo, maxAmount);

        // To avoid underflowing the token pool, we fund an account when there has been more iterations than total amount of circulating tokens divided by max amount
        if (counter >= tokenPool / maxAmount) {
          await transfer({
            receiver: account,
            amount: tokenPool / numberOfAccounts,
          });
          counter = 0;
        }

        const balance = (await getBalance(account)) as number;

        // using a random number safety gap to avoid underflowing the account
        const amountWithSafetyGap = amount + getRandomNumber(seededRandomNo, 1);
        if (amountWithSafetyGap > balance) {
          logger.info(
            `Insufficient funds for ${account.account}\nFunds necessary: ${amountWithSafetyGap}\nFunds available: ${balance}`,
          );
          logger.info('Skipping transfer');
          continue;
        }

        // Generate seeded random number based on the previous number
        seededRandomNo = seedRandom(`${seededRandomNo}`);

        let nextAccount =
          accounts[getRandomNumber(seededRandomNo, accounts.length)];

        // Random select a transfer type
        const transferType = getRandomOption(
          seededRandomNo,
          simualtionTransferOptions,
        );

        let result;

        // This is to simulate cross chain transfers
        if (transferType === 'xchaintransfer') {
          if (account.chainId === nextAccount.chainId) {
            nextAccount = {
              ...nextAccount,
              chainId: `${getRandomNumber(
                seededRandomNo,
                devnetConfig.NUMBER_OF_CHAINS,
              )}` as ChainId,
            };
          }

          if (account.chainId === nextAccount.chainId) {
            logger.info('Skipping cross chain transfer to same chain');
            continue;
          }

          // Get a random account to potentially pay for the gas
          const possibleGasPayer = getRandomOption(seededRandomNo, accounts);

          result = await crossChainTransfer({
            sender: account,
            receiver: nextAccount,
            amount,
            gasPayer:
              possibleGasPayer.chainId === nextAccount.chainId
                ? possibleGasPayer
                : sender00,
          });
        } else {
          // Make sure the chain id is the same if the transfer type is transfer or safe-transfer
          if (account.chainId !== nextAccount.chainId) {
            nextAccount = { ...nextAccount, chainId: account.chainId };
          }

          if (isEqualChainAccounts(account, nextAccount)) {
            logger.info('Skipping transfer to self');
            continue;
          }

          // Using a random number to determine if the transfer is a safe transfer or not
          if (transferType === 'transfer') {
            result = await transfer({
              receiver: nextAccount,
              sender: account,
              amount,
              chainId: account.chainId,
            });
          }
          if (transferType === 'safe-transfer') {
            result = await safeTransfer({
              receiver: nextAccount,
              sender: account,
              amount,
              chainId: account.chainId,
            });
          }
        }

        appendToFile(filepath, {
          timestamp: Date.now(),
          from: account.account,
          to: nextAccount.account,
          amount,
          requestKey: result?.reqKey || '',
          type: transferType,
        });

        // Increase total transfers
        totalTransfers++;

        // Check if max transfers has been reached
        if (totalTransfers >= maxTransfers) {
          logger.info('Maximum number of transfers reached');
          break;
        }

        // Check if duration has been reached
        if (Date.now() - startTime >= duration) {
          logger.info('Duration reached');
          break;
        }

        // If the account is not in the accountlist, add it
        const accountExists = accounts.some((existingAccount) =>
          isEqualChainAccounts(nextAccount, existingAccount),
        );
        if (!accountExists) {
          accounts.push(nextAccount);
        }

        await new Promise((resolve) => setTimeout(resolve, transferInterval));
      }
      counter++;
      // Timeout
      await new Promise((resolve) => setTimeout(resolve, transferInterval));
    }
  } catch (error) {
    appendToFile(filepath, { error });
    throw error;
  }
}