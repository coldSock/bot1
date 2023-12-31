import type { Config } from 'drizzle-kit';
import { Keys } from '@dist/keys.js';

export default {
  schema: '@db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: Keys.dbUrl,
  },
} satisfies Config;
