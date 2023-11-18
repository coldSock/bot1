import { getEnvVar } from './utils/index.js';

export const Keys = {
  clientToken: getEnvVar('CLIENT_TOKEN'),
  testGuild: getEnvVar('TEST_GUILD'),
  logChannel: getEnvVar('LOG_CHANNEL_ID'),
  db: getEnvVar('DATABASE_URL'),
} as const;

export default Keys;
