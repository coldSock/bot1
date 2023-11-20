import { ChannelType, TextChannel } from 'discord.js';
import type { CommandData, SlashCommandProps, CommandOptions } from 'commandkit';

export const data: CommandData = {
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
      type: 9,
      required: true,
    },
  ],
};

/**
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
 */
export async function run({ interaction, client, handler }: SlashCommandProps) {
  const channel = interaction.options.getChannel('channel', true) as TextChannel;
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
  } catch (error) {
    console.error('Failed to delete messages:', error);
    interaction.reply({ content: 'Failed to delete messages.', ephemeral: true });
  }
}

export const options: CommandOptions = {
  devOnly: true,
  guildOnly: true,
  userPermissions: ['Administrator', 'AddReactions'],
  botPermissions: ['Administrator', 'AddReactions'],
  deleted: false,
};
