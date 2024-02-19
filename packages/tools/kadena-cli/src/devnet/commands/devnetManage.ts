import { devnetOverwritePrompt } from '../../prompts/devnet.js';
import { globalOptions } from '../../utils/globalOptions.js';
import { writeDevnet } from '../utils/devnetHelpers.js';

import { createExternalPrompt } from '../../prompts/generic.js';
import type { CreateCommandReturnType } from '../../utils/createCommand.js';
import { createCommand } from '../../utils/createCommand.js';
import { log } from '../../utils/logger.js';

export const manageDevnetsCommand: CreateCommandReturnType = createCommand(
  'manage',
  'Manage devnets',
  [
    globalOptions.devnetSelect(),
    globalOptions.devnetPort(),
    globalOptions.devnetUseVolume(),
    globalOptions.devnetMountPactFolder(),
    globalOptions.devnetVersion(),
  ],
  async (config) => {
    log.debug('devnet-manage:action', { config });

    const externalPrompt = createExternalPrompt({
      devnetOverwritePrompt,
    });
    const overwrite = await externalPrompt.devnetOverwritePrompt();

    if (overwrite === 'no') {
      log.warning(
        `\nThe devnet configuration "${config.name}" will not be updated.\n`,
      );
      return;
    }

    await writeDevnet(config);

    log.info(
      log.color.green(
        `\nThe devnet configuration "${config.name}" has been updated.\n`,
      ),
    );
  },
);
