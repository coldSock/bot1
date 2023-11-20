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
import type { APIButtonComponentBase } from 'discord-api-types/v9';
import { Keys } from '../../keys.js';
import { log as begLog } from '../../utils/once.js';
import { log as recLog } from '../../utils/recLog.js';
import type { CommandKit } from 'commandkit';

export default async function (interaction: Message<true>, client: Client<true>, handler: CommandKit) {
  if (interaction.guildId !== Keys.cmdGuild || interaction.channelId !== '1174235972515414037') return true;

  const button = new ButtonBuilder().setEmoji('<:plus:940149617683759104>').setStyle(ButtonStyle.Primary).setCustomId('button');

  const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

  const message = await interaction.channel.send({
    embeds: [begLog(), recLog()],
    components: [buttonRow],
  });
}
