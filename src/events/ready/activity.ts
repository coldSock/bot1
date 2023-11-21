/* general imports */
import type { Client } from 'discord.js';
import type { CommandKit } from 'commandkit';

export default function (c: Client<true>, client: Client<true>, handler: CommandKit) {
  console.log(`${c.user.username} is ready!`);
  client.user.setActivity('Vexus', { type: 3 });
  client.user.setStatus('online');
  return true;
}
