import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const example = pgTable('example', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
