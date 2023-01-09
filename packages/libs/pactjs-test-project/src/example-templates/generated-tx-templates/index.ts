// generated by pactjs-generator and pactjs-cli@0.0.7
import { buildUnsignedTransaction, ICommandBuilder } from '@kadena/client';

export default {
  'safe-transfer': (args: {
    fromAcct: string;
    toAcct: string;
    amount: string;
    chain: string;
    network: string;
    fromKey: string;
  }): ICommandBuilder<{}> => {
    const parts = [
      'code: |-\n  (coin.transfer "',
      '" "',
      '" ',
      ')\ndata:\npublicMeta:\n  chainId: "',
      '"\n  sender: ',
      '\n  gasLimit: 2500\n  gasPrice: 1.0e-8\n  ttl: 600\nnetworkId: ',
      '\nsigners:\n  - pubKey: ',
      '\n    caps:\n      - name: "coin.TRANSFER"\n        args: [',
      ', ',
      ', ',
      ']\n      - name: "coin.GAS"\n        args: []\ntype: exec\n',
    ];
    const holes = [
      'fromAcct',
      'toAcct',
      'amount',
      'chain',
      'fromAcct',
      'network',
      'fromKey',
      'fromAcct',
      'toAcct',
      'amount',
    ];

    return buildUnsignedTransaction(parts, holes, args);
  },

  'transfer.json': (args: {
    fromAcct: string;
    toAcct: string;
    amount: string;
    chain: string;
    network: string;
    fromKey: string;
  }): ICommandBuilder<{}> => {
    const parts = [
      '{\n  "code": "(coin.transfer \\"',
      '\\" \\"',
      '\\" ',
      ')",\n  "data": null,\n  "publicMeta": {\n      "chainId": "',
      '",\n      "sender": ',
      ',\n      "gasLimit": 2500,\n      "gasPrice": 1e-8,\n      "ttl": 600\n  },\n  "networkId": "',
      '",\n  "signers": [\n      {\n          "pubKey": "',
      '",\n          "caps": [\n              {\n                  "name": "coin.TRANSFER",\n                  "args": [\n                      "',
      '", "',
      '", "',
      '"\n                  ]\n              },\n              {\n                  "name": "coin.GAS",\n                  "args": []\n              }\n          ]\n      }\n  ],\n  "type": "exec"\n}\n',
    ];
    const holes = [
      'fromAcct',
      'toAcct',
      'amount',
      'chain',
      'fromAcct',
      'network',
      'fromKey',
      'fromAcct',
      'toAcct',
      'amount',
    ];

    return buildUnsignedTransaction(parts, holes, args);
  },

  'transfer.yaml': (args: {
    fromAcct: string;
    toAcct: string;
    amount: string;
    chain: string;
    network: string;
    fromKey: string;
  }): ICommandBuilder<{}> => {
    const parts = [
      'code: |-\n  (coin.transfer "',
      '" "',
      '" ',
      ')\ndata:\npublicMeta:\n  chainId: "',
      '"\n  sender: ',
      '\n  gasLimit: 2500\n  gasPrice: 1.0e-8\n  ttl: 600\nnetworkId: ',
      '\nsigners:\n  - pubKey: ',
      '\n    caps:\n      - name: "coin.TRANSFER"\n        args: [',
      ', ',
      ', ',
      ']\n      - name: "coin.GAS"\n        args: []\ntype: exec\n',
    ];
    const holes = [
      'fromAcct',
      'toAcct',
      'amount',
      'chain',
      'fromAcct',
      'network',
      'fromKey',
      'fromAcct',
      'toAcct',
      'amount',
    ];

    return buildUnsignedTransaction(parts, holes, args);
  },
};
