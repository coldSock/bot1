import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { Keys } from './keys.js';

const sql = postgres(Keys.db, { max: 1 });
const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'drizzle' });
