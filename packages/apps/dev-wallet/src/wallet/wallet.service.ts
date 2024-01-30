import {
  ICommand,
  IPactCommand,
  IUnsignedCommand,
  addSignatures,
} from '@kadena/client';
import {
  kadenaDecrypt,
  kadenaEncrypt,
  kadenaGetPublic,
  kadenaMnemonicToSeed,
  kadenaSignWithSeed,
  randomBytes,
} from '@kadena/hd-wallet';
import {
  IAccount,
  IKeySource,
  IProfile,
  WalletRepository,
} from './wallet.repository';

const DEFAULT_DERIVATION_PATH_TEMPLATE = `m'/44'/626'/<index>'`;

type ServiceProps = {
  walletRepository: WalletRepository;
  profile: IProfile;
  encryptionKey: Uint8Array;
  encryptedSeed: Uint8Array;
};

const getProfile =
  ({
    walletRepository,
    profile,
  }: Pick<ServiceProps, 'walletRepository' | 'profile'>) =>
  async () => {
    return walletRepository.getProfile(profile.uuid);
  };

const getAccounts =
  ({
    walletRepository,
    profile,
  }: Pick<ServiceProps, 'walletRepository' | 'profile'>) =>
  async () => {
    return walletRepository.getAccountsByProfileId(profile.uuid);
  };

const sign = (props: ServiceProps) => async (TXs: IUnsignedCommand[]) => {
  const { encryptedSeed, encryptionKey, profile } = props;
  if (!encryptedSeed) {
    throw new Error('Wallet is not unlocked');
  }

  const keySources = profile.keySources;

  const signedTx = Promise.all(
    TXs.map(async (Tx) => {
      const signatures = await Promise.all(
        keySources.map(async ({ publicKeys, derivationPathTemplate }) => {
          const cmd: IPactCommand = JSON.parse(Tx.cmd);
          const relevantIndexes = cmd.signers
            .map((signer) =>
              publicKeys.findIndex((publicKey) => publicKey === signer.pubKey),
            )
            .filter((index) => index !== undefined) as number[];

          const signatures = await kadenaSignWithSeed(
            encryptionKey,
            encryptedSeed,
            relevantIndexes,
            derivationPathTemplate,
          )(Tx.hash);

          return signatures;
        }),
      );
      return addSignatures(Tx, ...signatures.flat());
    }),
  );

  return signedTx;
};

const decryptMnemonic =
  ({
    walletRepository,
    profile,
  }: Pick<ServiceProps, 'walletRepository' | 'profile'>) =>
  async (password: string) => {
    const encryptedMnemonic = await walletRepository.getEncryptedValue(
      profile.seedKey,
    );
    if (!encryptedMnemonic) {
      throw new Error('No wallet found');
    }
    const decryptedMnemonicBuffer = await kadenaDecrypt(
      password,
      encryptedMnemonic,
    );
    const mnemonic = new TextDecoder().decode(decryptedMnemonicBuffer);
    return mnemonic;
  };

const createProfileAndFirstAccount =
  (
    props: Pick<
      ServiceProps,
      'encryptedSeed' | 'encryptionKey' | 'walletRepository'
    >,
  ) =>
  async (profileName: string, encryptedMnemonic: Uint8Array) => {
    const { walletRepository, encryptionKey, encryptedSeed } = props;
    const mnemonicKey = crypto.randomUUID();

    const publicKey = await kadenaGetPublic(
      encryptionKey,
      encryptedSeed,
      1,
      DEFAULT_DERIVATION_PATH_TEMPLATE,
    );

    await walletRepository.addEncryptedValue(mnemonicKey, encryptedMnemonic);

    const profileId = crypto.randomUUID();

    const keySource: IKeySource = {
      uuid: crypto.randomUUID(),
      source: 'hd-wallet',
      derivationPathTemplate: DEFAULT_DERIVATION_PATH_TEMPLATE,
      publicKeys: [publicKey],
    };

    const profile: IProfile = {
      uuid: profileId,
      name: profileName,
      networks: [],
      seedKey: mnemonicKey,
      keySources: [keySource],
    };

    await walletRepository.addProfile(profile);

    const account: IAccount = {
      uuid: crypto.randomUUID(),
      alias: '',
      profileId: profile.uuid,
      address: `k:${publicKey}`,
      guard: {
        type: 'keySet',
        pred: 'keys-any',
        publicKeys: [
          {
            publicKey: publicKey,
            keySourceId: keySource.uuid,
            index: 0,
          },
        ],
      },
    };

    await walletRepository.addAccount(account);

    return profile;
  };

export interface IWalletService {
  sign: (TXs: IUnsignedCommand[]) => Promise<(IUnsignedCommand | ICommand)[]>;
  decryptMnemonic: (password: string) => Promise<string>;
  getProfile: () => Promise<IProfile>;
  getAccounts: () => Promise<IAccount[]>;
}

// For now wa just support hd-wallet keySources; we need to refactor this to support other types of keySources
export function walletService(config: ServiceProps): IWalletService {
  return {
    sign: sign(config),
    decryptMnemonic: decryptMnemonic(config),
    getProfile: getProfile(config),
    getAccounts: getAccounts(config),
  };
}

export const walletFactory = (walletRepository: WalletRepository) => ({
  async createWallet(profileName: string, password: string, mnemonic: string) {
    if (!walletRepository) {
      throw new Error('Wallet repository not initialized');
    }

    const encryptionKey = randomBytes(32);
    const encryptedSeed = await kadenaMnemonicToSeed(
      encryptionKey,
      mnemonic,
      'buffer',
    );

    const encryptedMnemonic = await kadenaEncrypt(password, mnemonic, 'buffer');

    const profile = await createProfileAndFirstAccount({
      walletRepository,
      encryptionKey,
      encryptedSeed,
    })(profileName, encryptedMnemonic);

    const service = walletService({
      walletRepository,
      profile,
      encryptionKey,
      encryptedSeed,
    });

    return service;
  },

  async unlockWallet(profileId: string, password: string) {
    if (!walletRepository) {
      throw new Error('Wallet repository not initialized');
    }
    const profile = await walletRepository.getProfile(profileId);
    const encryptedMnemonic = await walletRepository.getEncryptedValue(
      profile.seedKey,
    );
    const decryptedMnemonicBuffer = await kadenaDecrypt(
      password,
      encryptedMnemonic,
    );

    const mnemonic = new TextDecoder().decode(decryptedMnemonicBuffer);
    const encryptionKey = randomBytes(32);
    const encryptedSeed = await kadenaMnemonicToSeed(
      encryptionKey,
      mnemonic,
      'buffer',
    );

    const service = walletService({
      walletRepository,
      profile,
      encryptionKey,
      encryptedSeed,
    });

    return service;
  },
});
