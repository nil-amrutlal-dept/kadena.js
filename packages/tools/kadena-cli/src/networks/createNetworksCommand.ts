import { defaultNetworksPath } from '../constants/networks';
import { ensureFileExists } from '../utils/filesystem';
import { collectResponses } from '../utils/helpers';
import { processZodErrors } from '../utils/processZodErrors';

import type { TNetworksCreateOptions } from './networksCreateQuestions';
import {
  NetworksCreateOptions,
  networksCreateQuestions,
} from './networksCreateQuestions';
import { displayNetworkConfig, writeNetworks } from './networksHelpers';

import { select } from '@inquirer/prompts';
import clear from 'clear';
import type { Command } from 'commander';
import debug from 'debug';
import path from 'path';

async function shouldProceedWithNetworkCreate(
  network: string,
): Promise<boolean> {
  const filePath = path.join(defaultNetworksPath, `${network}.yaml`);
  if (ensureFileExists(filePath)) {
    const overwrite = await select({
      message: `Your network (config) already exists. Do you want to update it?`,
      choices: [
        { value: 'yes', name: 'Yes' },
        { value: 'no', name: 'No' },
      ],
    });
    return overwrite === 'yes';
  }
  return true;
}

async function runNetworksCreate(
  program: Command,
  version: string,
  args: TNetworksCreateOptions,
): Promise<void> {
  try {
    const responses = await collectResponses(args, networksCreateQuestions);

    const networkConfig = { ...args, ...responses };

    NetworksCreateOptions.parse(networkConfig);

    writeNetworks(networkConfig);

    displayNetworkConfig(networkConfig);

    const proceed = await select({
      message: 'Is the above network configuration correct?',
      choices: [
        { value: 'yes', name: 'Yes' },
        { value: 'no', name: 'No' },
      ],
    });

    if (proceed === 'no') {
      clear(true);
      console.log("Let's restart the configuration process.");
      await runNetworksCreate(program, version, args);
    } else {
      console.log('Configuration complete. Goodbye!');
    }
  } catch (e) {
    console.log(e);
    processZodErrors(program, e, args);
  }
}

export function createNetworksCommand(program: Command, version: string): void {
  program
    .command('create')
    .description('Create new network')
    .option('-n, --network <network>', 'Kadena network (e.g. "mainnet")')
    .option(
      '-nid, --networkId <networkId>',
      'Kadena network Id (e.g. "mainnet01")',
    )
    .option(
      '-h, --networkHost <networkHost>',
      'Kadena network host (e.g. "https://api.chainweb.com")',
    )
    .option(
      '-e, --networkExplorerUrl <networkExplorerUrl>',
      'Kadena network explorer (e.g. "https://explorer.chainweb.com/mainnet/tx/")',
    )
    .action(async (args: TNetworksCreateOptions) => {
      debug('network-create:action')({ args });

      if (
        args.network &&
        !(await shouldProceedWithNetworkCreate(args.network.toLowerCase()))
      ) {
        console.log('Network creation aborted.');
        return;
      }

      await runNetworksCreate(program, version, args);
    });
}
