import { processZodErrors } from '../utils/processZodErrors.js';
// TO-DO: Implement this command
// choices: [
//   'Encrypt an unencrypted HD key',
//       '> List of unencrypted HD keys',
//          '> select and encrypt an unencrypted HD key',
//   'Re-encrypt a key with a new password',
//       '> List of encrypted HD keys',
//          '> select and encrypt with given password',
//   'Delete a key',
//       '> List of all keys',
//          '> select and delete a key',
//   'Exit'
// ],
export function manageKeys(program, version) {
    program
        .command('manage')
        .description('Manage key(s)')
        .action((args) => {
        try {
            // TODO: use @inquirer/prompts to interactively get missing flags
            // TODO: create zod validator
            // Options.parse(args);
        }
        catch (e) {
            processZodErrors(program, e, args);
        }
        // TODO: implement
        throw new Error('Not Implemented Yet');
    });
}
