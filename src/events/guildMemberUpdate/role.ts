import type { GuildMember, Client, Role } from 'discord.js';
import type { CommandKit } from 'commandkit';
import { upLog } from '../../utils/updateLog.js';
import { Keys } from '../../keys.js';

export default async function (oldMember: GuildMember, newMember: GuildMember, client: Client<true>, handler: CommandKit) {
  if (oldMember.roles.cache.size === newMember.roles.cache.size) return;

  const isValid = (role: Role) => role.name !== '@everyone';

  const oldDisplayRoles = [...oldMember.roles.cache.values()]
    .map((role) => role)
    .filter(isValid)
    .join(', ');
  const newDisplayRoles = [...newMember.roles.cache.values()]
    .map((role) => role)
    .filter(isValid)
    .join(', ');

  const logChannel: any = await client.channels.fetch(Keys.logChannel);
  const logInvoke = upLog(oldMember, newMember, oldDisplayRoles, newDisplayRoles, client);
  await logChannel.send({ embeds: [logInvoke] });
}
