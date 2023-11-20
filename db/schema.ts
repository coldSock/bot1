import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  user: varchar('user', { length: 200 }),
});

export type Item = typeof items.$inferSelect;
