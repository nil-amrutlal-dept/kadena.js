import { readFileSync } from 'node:fs';

let stdin: string | null = null;

/** should only be done once per execution, and BEFORE any prompts from inquirer */
export async function readStdin(): Promise<string | null> {
  if (stdin !== null) {
    return stdin;
  }

  try {
    await import('ttys');
    // eslint-disable-next-line require-atomic-updates
    stdin = readFileSync(0, 'utf8');
  } catch (e) {
    /* empty */
  }

  return stdin;
}
