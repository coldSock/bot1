/* base imports */
import { ChannelType, TextChannel } from 'discord.js';
export const data = {
    name: 'delete',
    description: 'Delete a set amount of messagesa.a',
    options: [
        {
            name: 'channel',
            description: 'The channel to delete messages in',
            type: 7,
            channel_types: [0],
            required: true,
        },
        {
            name: 'amount',
            description: 'The amount of messages to delete',
            type: 4,
            required: true,
        },
    ],
};
/**
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
 */
export async function run({ interaction, client, handler }) {
    const channel = interaction.options.getChannel('channel', true);
    const amount = interaction.options.getInteger('amount') || 1;
    if (channel.type !== ChannelType.GuildText) {
        return interaction.reply({ content: 'You can only delete messages in text channels!', ephemeral: true });
    }
    if (amount > 100) {
        return interaction.reply({ content: 'You can only delete 100 messages at a time!', ephemeral: true });
    }
    try {
        const messages = await channel.messages.fetch({ limit: amount });
        await channel.bulkDelete(messages);
        interaction.reply({ content: `Deleted ${amount} messages!`, ephemeral: true });
    }
    catch (error) {
        console.error('Failed to delete messages:', error);
        interaction.reply({ content: 'Failed to delete messages.', ephemeral: true });
    }
}
export const options = {
    aliases: ['del'],
    botcmds: false,
    commando: false,
    devOnly: false,
    guildOnly: false,
    userPermissions: ['Administrator', 'AddReactions'],
    botPermissions: ['Administrator', 'AddReactions'],
    deleted: false,
};
//# sourceMappingURL=delete.js.map