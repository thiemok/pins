import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  updated_at: timestamp().$onUpdate(() => sql`NOW()`),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};
