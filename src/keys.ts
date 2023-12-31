import { getEnvVar } from './utils/index.js';

export const Keys = {
  clientToken: getEnvVar('CLIENT_TOKEN'),
  testGuild: getEnvVar('TEST_GUILD'),
  logChannel: getEnvVar('LOG_CHANNEL_ID'),
  dbUrl: getEnvVar('DATABASE_URL'),
  cmdGuild: getEnvVar('COMMANDO_GUILD'),
  cookie: getEnvVar('COOKIE'),
} as const;

export default Keys;
