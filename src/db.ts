import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { Keys } from './keys.js';

const client = new Client({
  connectionString: Keys.db,
});

await client.connect();
const db = drizzle(client);
