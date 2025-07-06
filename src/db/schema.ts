import { pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { linestring } from '@/db/column-types';
import { timestamps } from '@/db/common';

export const example = pgTable('example', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const routes = pgTable('routes', {
  id: serial('id').primaryKey(),
  slug: varchar('slug').unique().notNull(),
  owner: varchar('owner').notNull(),
  name: varchar('name').notNull(),
  track: linestring('track').notNull(),
  ...timestamps,
});
