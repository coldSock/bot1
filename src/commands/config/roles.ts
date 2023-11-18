import { ChannelType, TextChannel, RoleSelectMenuBuilder, ActionRowBuilder } from 'discord.js';
import type { CommandData, SlashCommandProps, CommandOptions } from 'commandkit';
import { type APIRole } from 'discord-api-types/v10';
import { Keys } from '../../keys.js';
import { log } from '../../utils/log.js';

export const data: CommandData = {
  name: 'roles',
  description: 'Configure roles for the database eco-system.',
  options: [
    {
      name: 'type',
      description: 'Select the type of roles to modify',
      type: 3,
      required: true,
      choices: [
        {
          name: 'Officers',
          value: 'oc',
        },
        {
          name: 'High Command',
          value: 'hc',
        },
      ],
    },
  ],
};

/**
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0
 */
export async function run({ interaction, client, handler }: SlashCommandProps) {
  const subcommand = await interaction.options.getString('type', true);

  // if (!interaction.guild) return;
  // const roles: APIRole = interaction.guild.roles.cache.values();
  // if (!roles) return;
  // const ignoredRoles: Array<string> = ['@everyone', '▬▬▬▬▬▬▬', 'Dyno', 'Group Holder', '[DEV]: Vexus Engineers', 'Vexonian', 'Authorized'];
  // const filteredRoles = roles
  //   .values()
  //   .filter((role: any) => !ignoredRoles.includes(role.name))
  //   .map((role: any) => role)
  //   .join(', ');

  // console.log(filteredRoles);

  const roleSelect = new RoleSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setPlaceholder(`Select the ${subcommand} roles...`)
    .setMinValues(1)
    .setMaxValues(25);

  const actionRow: any = new ActionRowBuilder().addComponents(roleSelect);

  const reply = await interaction.reply({
    components: [actionRow],
  });

  const collector = reply.createMessageComponentCollector({
    filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
    time: 60_000,
  });

  collector.on('collect', async (inter: any) => {
    if (inter.values.lenght) {
      inter.reply('You must select at least one role!');
      return;
    }
    const logChannel: any = await client.channels.fetch(Keys.logChannel);
    const logInvoke = log(interaction, inter, client);
    await logChannel.send({ embeds: [logInvoke] });
    interaction.deleteReply();
  });
  collector.on('end', (collected, reason) => {
    if (collected.size === 0) {
      reply.edit({ content: `You did not select any roles! ${reason}`, components: [] });
    }
  });
  collector.on('error', (err) => {
    console.error(err);
  });
}

export const options: CommandOptions = {
  devOnly: true,
  guildOnly: true,
  userPermissions: ['Administrator', 'AddReactions'],
  botPermissions: ['Administrator', 'AddReactions'],
  deleted: false,
};
