import { drizzle } from 'drizzle-orm/neon-http';

import { env } from '@/lib/env/server';

export const dbClient = drizzle(env.DATABASE_URL);
