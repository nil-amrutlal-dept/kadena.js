import chalk from 'chalk';
import type { Issues } from './types.js';

const SEPARATOR_WARN = `        ${chalk.yellow('warning')}  `; // Emulate eslint-like output
const SEPARATOR_ERROR = `        ${chalk.red('error')}    `; // Emulate eslint-like output

export const logger = (filePath: string) => (issues: Issues) => {
  if (issues.length > 0) {
    console.log(chalk.underline(filePath));
    issues.forEach((issue) => {
      const [severity, message] = issue;
      if (severity === 'warn') console.warn(SEPARATOR_WARN, message);
      if (severity === 'error') console.error(SEPARATOR_ERROR, message);
    });
    console.log();
  }
};
