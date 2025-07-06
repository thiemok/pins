import { z } from 'zod/v4';

import { type WithOptionalValues } from '@/lib/types/utils';

import { clientSchema } from './schemas';

/* eslint-disable @typescript-eslint/no-explicit-any -- we allow any here to make it easier to work with enums for variables as env is always string | undefined */

// Explicitly access each environment variable
const clientProcessEnv = {
  /* Vercel */
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV as any,

  /* Clerk */
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
} satisfies WithOptionalValues<z.infer<typeof clientSchema>>;

/* eslint-enable @typescript-eslint/no-explicit-any */

const result = clientSchema.safeParse(clientProcessEnv);

if (!result.success) {
  console.error(
    '❌ Invalid client environment variables:',
    z.prettifyError(result.error)
  );
  throw new Error('Invalid client environment variables');
}

export const clientEnv = result.data;
