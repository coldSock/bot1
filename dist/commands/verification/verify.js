/* embeds */
import { Embed as Log } from '../../logs/status.js';
import noblox from 'noblox.js';
import { Keys } from '../../keys.js';
export const data = {
    name: 'verify',
    description: 'Verify your ROBLOX account to gain access to the server.',
    options: [
        {
            name: 'name',
            description: 'Your ROBLOX username.',
            type: 3,
            required: false,
        },
    ],
};
/**
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0
 */
export async function run({ interaction, client, handler }) {
    const currentUser = await noblox.setCookie(Keys.cookie);
    console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`);
    const username = interaction.options.getString('name') ?? '';
    const userId = await noblox.getIdFromUsername(username);
    const user = await noblox.getPlayerInfo(userId);
    const rbxName = user.username;
    const rbxDisplayName = user.displayName;
    interaction.deferReply();
    const guild = await interaction.guild;
    if (!guild)
        return console.log('No guild found.');
    const member = await guild.members.fetch(interaction.user.id);
    const role = guild.roles.cache.find((role) => role.name === 'Verified');
    if (!role)
        return console.log('No role found.');
    interaction.reply({ content: `${rbxName} + ${rbxDisplayName}` });
}
export const options = {
    userPermissions: ['Administrator', 'AddReactions'],
    botPermissions: ['Administrator', 'AddReactions'],
    deleted: false,
    commando: false,
    botcmds: false,
};
//# sourceMappingURL=verify.js.map