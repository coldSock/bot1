import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
// schema.ts
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
});
