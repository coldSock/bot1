/* base imports */
import {
  type Message,
  type Client,
  type ButtonInteraction,
  ButtonStyle,
  ActionRowBuilder,
  UserSelectMenuBuilder,
  ComponentType,
  ButtonBuilder,
} from 'discord.js';
import type { CommandKit } from 'commandkit';
/* env variables */
import { Keys } from '../../keys.js';
/* embeds */
import { Embed as Log } from '../../logs/rec_1.js';
import { Embed as InteractionLog } from '../../logs/rec_2.js';

export default async function (interaction: Message<true>, client: Client<true>, handler: CommandKit) {
  if (interaction.guildId !== Keys.cmdGuild || interaction.channelId !== '1174235972515414037' || interaction.author.id !== '507944419954262027')
    return true;

  const button = new ButtonBuilder().setEmoji('<:plus:940149617683759104>').setStyle(ButtonStyle.Primary).setCustomId('button');

  const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  const message = await interaction.channel.send({
    embeds: [Log(), InteractionLog()],
    components: [buttonRow],
  });
  return true;
}
