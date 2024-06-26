import { env } from './env';

export const getIPFSLink = (uri: string): string => {
  const idAndTypeRegExp =
    /(?:https:\/\/)?([^\/.]+)\.ipfs\.(nftstorage|dweb)\.link\/(.+)/;
  const match = uri.match(idAndTypeRegExp);

  if (!match) return uri;

  return `${env.URL}/api/ipfs/${match[1]}/${match[2]}/${match[3]}`;
};
