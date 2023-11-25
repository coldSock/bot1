/* base imports */
import type { GuildMember, Client, Role } from 'discord.js';
import type { CommandKit } from 'commandkit';
/* embeds */
import { Embed as Log } from './../../logs/update.js';
/* env variables */
import { Keys } from '../../keys.js';
/* db */
import { db } from '../../db/index.js';
import * as schema from '../../db/schema.js';
import { type InferModel, eq } from 'drizzle-orm';

const { users } = schema;

export default async function (
  oldMember: GuildMember,
  newMember: GuildMember,
  client: Client<true>,
  handler: CommandKit,
  user: InferModel<typeof schema.users, 'insert'>
) {
  if (oldMember.roles.cache.size === newMember.roles.cache.size) return;

  // const oldDisplayRoles = [...oldMember.roles.cache.values()]
  //   .map((role) => role)
  //   .filter(isValid)
  //   .join(', ');
  // const newDisplayRoles = [...newMember.roles.cache.values()]
  //   .map((role) => role)
  //   .filter(isValid)
  //   .join(', ');

  const oldRole: Role = oldMember.roles.highest;
  const newRole: Role = newMember.roles.highest;

  const userQuery = await db.select().from(users).where(eq(users.name, newMember.user.username));

  if (oldRole.id === newRole.id) return;
  if (!userQuery || !userQuery.length) {
    await db.insert(users).values({ discordId: newMember.user.id, name: newMember.user.username, roles: newRole.id });
  }
  if (userQuery && userQuery.length) {
    const updatedUser: { updatedId: number }[] = await db
      .update(users)
      .set({ name: newMember.user.username, roles: newRole.id })
      .where(eq(users.discordId, newMember.user.id))
      .returning({ updatedId: users.id });
    console.log(updatedUser);
  }

  const logChannel: any = await client.channels.fetch(Keys.logChannel);
  const logInvoke = Log(oldMember, newMember, oldRole, newRole, client);
  await logChannel.send({ embeds: [logInvoke] });
}
