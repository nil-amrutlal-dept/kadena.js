import { initCommand } from './init';

import { Command } from 'commander';

const SUBCOMMAND_ROOT: 'config' = 'config';

export function configCommandFactory(program: Command, version: string): void {
  const configProgram = program
    .command(SUBCOMMAND_ROOT)
    .description(
      `Tool for setting up and managing te CLI configuration and contexts`,
    );

  initCommand(configProgram, version);
}
