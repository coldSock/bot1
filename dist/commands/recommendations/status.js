/* embeds */
import { Embed as Log } from '../../logs/status.js';
/* db */
import { db } from '../../db/index.js';
import * as schema from '../../db/schema.js';
import { eq } from 'drizzle-orm';
export const data = {
    name: 'status',
    description: 'Check the status of your recommendations.a',
    options: [
        {
            name: 'user',
            description: 'Select the user to check the status of. (OPTIONAL -- defaults to you)',
            type: 6,
            required: false,
        },
    ],
};
/**
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0
 */
export async function run({ interaction, client, handler }) {
    const discordId = interaction.options.getUser('user')?.id || interaction.user.id;
    const recommendations = await db.select().from(schema.recommendations).where(eq(schema.recommendations.discordId, discordId));
    const recNum = recommendations.length;
    const logInvoke = Log(interaction, recNum, discordId, client);
    await interaction.reply({ embeds: [logInvoke] });
}
export const options = {
    userPermissions: ['Administrator', 'AddReactions'],
    botPermissions: ['Administrator', 'AddReactions'],
    deleted: false,
    commando: true,
    botcmds: true,
};
//# sourceMappingURL=status.js.map