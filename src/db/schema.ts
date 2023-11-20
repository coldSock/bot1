import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// schema.ts
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  dId: varchar('dId', { length: 256 }),
  roles: text('roles'),
});
