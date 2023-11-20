import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { Keys } from '../keys.js';
import * as schema from './schema.js';
import postgres from 'postgres';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
