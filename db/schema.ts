import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});

export type Item = typeof items.$inferSelect;
