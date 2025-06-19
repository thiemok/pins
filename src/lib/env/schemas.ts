import { z } from 'zod';

// Server-side environment variables
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

// Client-side environment variables (must be prefixed with NEXT_PUBLIC_)
export const clientSchema = z.object({
  // Add client-side env vars here when needed
  // NEXT_PUBLIC_APP_URL: z.string().url(),
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;
