/* general imports */
import { type Client, AttachmentBuilder } from 'discord.js';
import type { CommandKit } from 'commandkit';

export default function (c: Client<true>, client: Client<true>, handler: CommandKit) {
  const logo = new AttachmentBuilder('../assets/botLogo@3.png');
  console.log(`${c.user.username} is ready!`);
  client.user.setActivity('Vexus', { type: 3 });
  return true;
}
