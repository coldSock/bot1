import { Client, GatewayIntentBits } from 'discord.js';
import { CommandKit as handler } from 'commandkit';
import { fileURLToPath } from 'url';
import path from 'path';
import Keys from './keys.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

new handler({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  validationsPath: path.join(__dirname, 'validations'),
  devGuildIds: ['1165699623139164181'],
  // '1173229649615138856', '838780798752391188',
  devUserIds: ['507944419954262027'],
  skipBuiltInValidations: false,
  bulkRegister: true,
});

client.login(Keys.clientToken).catch((err) => {
  console.error('[Login Error]', err);
  process.exit(1);
});
