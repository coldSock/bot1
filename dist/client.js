/* base imports */
import { Client, GatewayIntentBits } from 'discord.js';
import { CommandKit as handler } from 'commandkit';
import { fileURLToPath } from 'url';
import path from 'path';
/* env variables */
import { Keys } from './keys.js';
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
const __dirname = path.dirname(fileURLToPath(import.meta.url));
new handler({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    validationsPath: path.join(__dirname, 'validations'),
    skipBuiltInValidations: true,
    bulkRegister: true,
});
client.login(Keys.clientToken).catch((err) => {
    console.error('[Login Error]', err);
    process.exit(1);
});
//# sourceMappingURL=client.js.map