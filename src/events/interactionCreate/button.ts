import type { Interaction, Client } from 'discord.js';
import type { CommandKit } from 'commandkit';
import { ActionRowBuilder, UserSelectMenuBuilder, ComponentType } from 'discord.js';

/**
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
 */
export default function (interaction: Interaction, client: Client<true>, handler: CommandKit) {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'button') {
    const select = new UserSelectMenuBuilder().setCustomId('select').setPlaceholder('Select a user...').setMinValues(1).setMaxValues(10);

    const actionRow = new ActionRowBuilder().addComponents(select);

    interaction.deferReply();

    await interaction.update({ components: [actionRow], ephemeral: true });

    const collector = interaction.channel.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id && i.customId === 'select',
      time: 60_000,
    });

    collector.on('collect', async (inter) => {
      if (inter.values.length) {
        inter.reply('You must select at least one user!');
        return;
      }

      const users = inter.values.map((value) => `<@${value}>`).join(', ');

      await inter.update({ content: `You selected: ${users}` });
    });
  }
}
