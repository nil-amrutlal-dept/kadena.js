// import { PactCommand } from '@kadena/client';
// import { createExp } from '@kadena/pactjs';

// const NETWORK_ID = 'testnet04';
// const chainId = '1';
// const gasLimit = 6000;
// const gasPrice = 0.001;
// const ttl = 600;
// export const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${chainId}/pact`;

// // Tips: we provided some tips in the README file
// // Don't forget to explore the documentation for more details
// // ==>
// export async function listModules() {
//   // 1 - Create a new PactCommand
//   const cmd = new PactCommand();

//   // 2 - Bind to the Pact code
//   cmd.code = createExp('list-modules');

//   // 3 - Set the meta data
//   cmd.setMeta({ gasLimit, gasPrice, ttl }, NETWORK_ID);

//   // 4 - Call the Pact local endpoint to retrieve the result
//   return await cmd.local(API_HOST);
// }

// export async function freeClock() {
//   const pactCommand = new PactCommand();
//   pactCommand.code = createExp('free.clock.get-line');
//   pactCommand.setMeta({ gasLimit, gasPrice, ttl }, NETWORK_ID);
//   return await pactCommand.local(API_HOST);
// }
