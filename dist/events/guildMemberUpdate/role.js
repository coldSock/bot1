/* embeds */
import { Embed as Log } from './../../logs/update.js';
/* env variables */
import { Keys } from '../../keys.js';
/* db */
import { db } from '../../db/index.js';
import * as schema from '../../db/schema.js';
import { eq } from 'drizzle-orm';
const { users } = schema;
export default async function (oldMember, newMember, client, handler, user) {
    if (oldMember.roles.cache.size === newMember.roles.cache.size)
        return;
    // const oldDisplayRoles = [...oldMember.roles.cache.values()]
    //   .map((role) => role)
    //   .filter(isValid)
    //   .join(', ');
    // const newDisplayRoles = [...newMember.roles.cache.values()]
    //   .map((role) => role)
    //   .filter(isValid)
    //   .join(', ');
    const oldRole = oldMember.roles.highest;
    const newRole = newMember.roles.highest;
    const userQuery = await db.select().from(users).where(eq(users.name, newMember.user.username));
    if (oldRole.id === newRole.id)
        return;
    if (!userQuery || !userQuery.length) {
        await db.insert(users).values({ discordId: newMember.user.id, name: newMember.user.username, roles: newRole.id });
    }
    if (userQuery && userQuery.length) {
        const updatedUser = await db
            .update(users)
            .set({ name: newMember.user.username, roles: newRole.id })
            .where(eq(users.discordId, newMember.user.id))
            .returning({ updatedId: users.id });
        console.log(updatedUser);
    }
    const logChannel = await client.channels.fetch(Keys.logChannel);
    const logInvoke = Log(oldMember, newMember, oldRole, newRole, client);
    await logChannel.send({ embeds: [logInvoke] });
}
//# sourceMappingURL=role.js.map