import { defineConfig } from 'drizzle-kit';

import { env } from '@/lib/env/server';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
