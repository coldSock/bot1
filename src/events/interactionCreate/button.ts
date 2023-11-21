/* base imports */
import type { Interaction, Client, Role, User } from 'discord.js';
import type { CommandKit } from 'commandkit';
import { setTimeout } from 'node:timers/promises';
import { ActionRowBuilder, UserSelectMenuBuilder, ComponentType, StringSelectMenuBuilder, GuildMember } from 'discord.js';
/* db */
import { db } from '../../db/index.js';
import * as schema from '../../db/schema.js';
import { type InferModel, eq } from 'drizzle-orm';

const recs = [
  {
    label: 'Good conduct',
    value: 'good-conduct',
    description: 'The user is exceding the standards.',
    emoji: '<:Star4:790778277848547349>',
  },
  {
    label: 'Combat smtnh',
    value: 'combat',
    description: 'The user is exceding the standards.',
    emoji: '<:Star4:790778277848547349>',
  },
];

/**
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
 */
export default async function (interaction: Interaction, client: Client<true>, handler: CommandKit) {
  if (!interaction.isButton() || (await interaction.channelId) !== '1174235972515414037') return;
  if (interaction.customId === 'button') {
    const userSelect = new UserSelectMenuBuilder().setCustomId('user').setPlaceholder('Select a user...').setMinValues(1).setMaxValues(10);
    const stringSelect = new StringSelectMenuBuilder()
      .setCustomId('string')
      .setPlaceholder('Select a reason...')
      .addOptions(recs.map((r) => ({ label: r.label, value: r.value, description: r.description, emoji: r.emoji })));

    const userSelectRow = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(userSelect);
    const stringSelectRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(stringSelect);

    await interaction.reply({ components: [userSelectRow], ephemeral: true });

    const userCollector = interaction.channel!.createMessageComponentCollector({
      componentType: ComponentType.UserSelect,
      filter: (i) => i.user.id === interaction.user.id && i.customId === 'user',
      time: 60_000,
    });

    const stringCollector = interaction.channel!.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      filter: (i) => i.user.id === interaction.user.id && i.customId === 'string',
      time: 60_000,
    });

    userCollector.on('collect', async (inter) => {
      if (!inter.values.length) {
        inter.reply('You must select at least one user!');
        return;
      }
      const users = inter.values.map((value) => `<@${value}>`).join(', ');

      await inter.reply({ content: `You selected: ${users}\nNow select the reason`, ephemeral: true });
      userCollector.stop('completed');
      await interaction.editReply({ components: [stringSelectRow] });
      await setTimeout(1500);
      await inter.deleteReply();
    });

    stringCollector.on('collect', async (inter) => {
      if (!inter.values.length) {
        inter.reply('You must select at least one user!');
        return;
      }
      const reasons = inter.values.map((value) => `${value}`).join(', ');

      await inter.reply({ content: `You selected: ${reasons}`, ephemeral: true });
      await setTimeout(1500);
      await inter.deleteReply();
      stringCollector.stop('completed');
    });

    userCollector.on('end', async (collected: any, reason: any) => {
      if (collected.size === 0) {
        await interaction.editReply({ content: `You did not select any users! ${reason}`, components: [] });
      }

      const collectedMembers = await [...collected.values()].map((collected: any) => collected.members);

      const members = await [...collectedMembers.values()].map((col: any) => col.values());

      members.forEach(async (member: any) => {
        const memberObj: any = await [...member].map((c: any) => c);
        const m: any = memberObj[0];

        const userQuery = await db.select().from(schema.users).where(eq(schema.users.discordId, m.user.id));

        if (!userQuery || !userQuery.length) {
          await db.insert(schema.users).values({
            discordId: await m.user.id,
            name: m.user.username,
            roles: m.roles.cache.map((role: any) => role.name).join(', '),
          });
        }

        await db.insert(schema.recommendations).values({ discordId: m.user.id, name: m.user.username });
      });
    });

    stringCollector.on('end', async (collected: any, reason: any) => {
      if (collected.size === 0) {
        await interaction.editReply({ content: `You did not select any users! ${reason}`, components: [] });
      }
      if (collected) await interaction.editReply({ content: `All recieved successfuly, sending recommendation...`, components: [] });
      await setTimeout(1500);
      interaction.deleteReply();
    });
  }
}
