import type { GuildMember, Client, Role } from 'discord.js';
import type { CommandKit } from 'commandkit';
import { log as upLog } from '../../utils/updateLog.js';
import { Keys } from '../../keys.js';
import { db } from '../../db/index.js';
import * as schema from '../../db/schema.js';
import { InferModel, eq } from 'drizzle-orm';

export default async function (
  oldMember: GuildMember,
  newMember: GuildMember,
  client: Client<true>,
  handler: CommandKit,
  user: InferModel<typeof schema.users, 'insert'>
) {
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

  const userQuery = await db.select().from(schema.users).where(eq(schema.users.name, newMember.user.username));
  console.log(userQuery);

  if (!userQuery || !userQuery.length) {
    await db.insert(schema.users).values({ dId: newMember.user.id, name: newMember.user.username, roles: newDisplayRoles });
  } else {
    const updatedUser: { updatedId: number }[] = await db
      .update(schema.users)
      .set({ name: newMember.user.username })
      .where(eq(schema.users.dId, newMember.user.id))
      .returning({ updatedId: schema.users.id });
    console.log(updatedUser);
  }

  const logChannel: any = await client.channels.fetch(Keys.logChannel);
  const logInvoke = upLog(oldMember, newMember, oldDisplayRoles, newDisplayRoles, client);
  await logChannel.send({ embeds: [logInvoke] });
}
