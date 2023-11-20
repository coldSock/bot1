import { drizzle } from 'drizzle-orm/node-postgres';
import { Keys } from '../keys.js';
import postgres from 'postgres';
const connectionString = Keys.dbUrl;
const sql = postgres(connectionString, { max: 1 });
export const db = drizzle(sql);
