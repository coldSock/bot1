import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
// schema.ts
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    discordId: varchar('dId', { length: 256 }),
    roles: text('roles'),
});
export const userRelations = relations(users, ({ many }) => ({
    recommendations: many(recommendations),
}));
export const recommendations = pgTable('recommendations', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    discordId: varchar('dId', { length: 256 }),
});
export const recommendationRelations = relations(recommendations, ({ one }) => ({
    reciever: one(users, {
        fields: [recommendations.discordId],
        references: [users.discordId],
    }),
}));
//# sourceMappingURL=schema.js.map