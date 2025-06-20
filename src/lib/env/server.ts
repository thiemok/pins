import { type z } from 'zod';

import { type WithOptionalValues } from '@/lib/types/utils';

import { clientEnv } from './client';
import { serverSchema } from './schemas';

// Explicitly access each server environment variable
const serverProcessEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
} satisfies WithOptionalValues<z.infer<typeof serverSchema>>;

const result = serverSchema.safeParse(serverProcessEnv);

if (!result.success) {
  console.error(
    '❌ Invalid server environment variables:',
    result.error.format()
  );
  throw new Error('Invalid server environment variables');
}

export const env = {
  ...result.data,
  ...clientEnv,
};
