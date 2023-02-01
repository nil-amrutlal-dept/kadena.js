import { dotenv } from '../utils/dotenv';

import { PrismaClient } from '@prisma/client';

const url: string | undefined = dotenv.USE_EMBEDDED_POSTGRES
  ? dotenv.EMBEDDED_DATABASE_URL
  : dotenv.DATABASE_URL;

const options:
  | {
      datasources: {
        db: {
          url: string;
        };
      };
    }
  | undefined =
  url !== undefined
    ? {
        datasources: {
          db: {
            url,
          },
        },
      }
    : undefined;

const _prismaClient = new PrismaClient(options);
// eslint-disable-next-line @rushstack/typedef-var
export const prismaClient = _prismaClient;
