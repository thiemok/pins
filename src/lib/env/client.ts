import { clientSchema } from './schemas';

// Explicitly access each environment variable
const clientProcessEnv = {
  // Add client-side env vars here when needed
  // NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

const result = clientSchema.safeParse(clientProcessEnv);

if (!result.success) {
  console.error(
    '❌ Invalid client environment variables:',
    result.error.format()
  );
  throw new Error('Invalid client environment variables');
}

export const clientEnv = result.data;
