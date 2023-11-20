import { type Message, type Client, type ButtonInteraction, ButtonStyle, ActionRowBuilder, UserSelectMenuBuilder, ComponentType } from 'discord.js';
import type { CommandKit } from 'commandkit';
import { ButtonKit } from 'commandkit';
import { Keys } from '../../keys.js';
import { log as begLog } from '../../utils/once.js';
import { log as recLog } from '../../utils/recLog.js';

export default async function (messageInteraction: Message<true>, client: Client<true>, handler: CommandKit) {
  if (
    messageInteraction.guildId !== Keys.cmdGuild ||
    messageInteraction.channelId !== '1174235972515414037' ||
    messageInteraction.author.id === client.user.id ||
    messageInteraction.author.id !== '507944419954262027'
  )
    return;

  messageInteraction.channel.send({ embeds: [begLog()] });

  const button = new ButtonKit().setEmoji('<:plus:940149617683759104>').setStyle(ButtonStyle.Primary).setCustomId('button');

  const buttonRow = new ActionRowBuilder<ButtonKit>().addComponents(button);

  const message = await messageInteraction.channel.send({
    embeds: [recLog()],
    components: [buttonRow],
  });

  button.onClick(
    async (interaction: ButtonInteraction) => {
      const userSelect = new UserSelectMenuBuilder()
        .setCustomId(interaction.id)
        .setPlaceholder(`Select the user to be recommended...`)
        .setMinValues(0)
        .setMaxValues(10);

      console.log(interaction);
      const actionRow: any = new ActionRowBuilder().addComponents(userSelect);

      const reply = await interaction.reply({
        content: 'test',
        components: [actionRow],
      });

      const collector = reply.createMessageComponentCollector({
        componentType: ComponentType.UserSelect,
        // filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
        time: 60_000,
      });
      console.log(collector);

      collector.on('collect', async (interaction: any) => {
        if (interaction.values.lenght) {
          interaction.reply('You must select at least one role!');
          return;
        }
        messageInteraction.channel.send({ content: 'test' });
      });
      collector.on('end', async (reason: any) => {
        const logChannel: any = await client.channels.fetch(Keys.logChannel);
        await logChannel.send({ contents: 'test' });
      });
    },
    { message }
  );
}
