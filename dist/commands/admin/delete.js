var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ChannelType } from 'discord.js';
export const data = {
    name: 'delete',
    description: 'Delete a set amount of messages.',
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
export function run({ interaction, client, handler }) {
    return __awaiter(this, void 0, void 0, function* () {
        const channel = interaction.options.getChannel('channel', true);
        const amount = interaction.options.getInteger('amount') || 1;
        if (channel.type !== ChannelType.GuildText) {
            return interaction.reply({ content: 'You can only delete messages in text channels!', ephemeral: true });
        }
        if (amount > 100) {
            return interaction.reply({ content: 'You can only delete 100 messages at a time!', ephemeral: true });
        }
        try {
            const messages = yield channel.messages.fetch({ limit: amount });
            yield channel.bulkDelete(messages);
            interaction.reply({ content: `Deleted ${amount} messages!`, ephemeral: true });
        }
        catch (error) {
            console.error('Failed to delete messages:', error);
            interaction.reply({ content: 'Failed to delete messages.', ephemeral: true });
        }
    });
}
export const options = {
    // devOnly: true,
    // guildOnly: true,
    userPermissions: ['Administrator', 'AddReactions'],
    botPermissions: ['Administrator', 'AddReactions'],
    deleted: false,
};
