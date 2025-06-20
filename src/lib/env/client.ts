import { type z } from 'zod';

import { type WithOptionalValues } from '@/lib/types/utils';

import { clientSchema } from './schemas';

// Explicitly access each environment variable
const clientProcessEnv = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL:
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
} satisfies WithOptionalValues<z.infer<typeof clientSchema>>;

const result = clientSchema.safeParse(clientProcessEnv);

if (!result.success) {
  console.error(
    '❌ Invalid client environment variables:',
    result.error.format()
  );
  throw new Error('Invalid client environment variables');
}

export const clientEnv = result.data;
