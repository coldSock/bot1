/* base imports */
import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import postgres from 'postgres';
import * as schema from './schema.js';
import pg from 'pg';
/* env variables */
import { Keys } from '../keys.js';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
