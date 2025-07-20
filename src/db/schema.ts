import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

import { linestringZM } from '@/db/column-types';
import { timestamps } from '@/db/common';

export const routes = pgTable('routes', {
  id: serial('id').primaryKey(),
  slug: varchar('slug').unique().notNull(),
  owner: varchar('owner').notNull(),
  name: varchar('name').notNull(),
  track: linestringZM('track').notNull(),
  ...timestamps,
});
