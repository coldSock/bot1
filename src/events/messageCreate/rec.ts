import { type Message, type Client, type ButtonInteraction, ButtonStyle, ActionRowBuilder } from 'discord.js';
import type { CommandKit } from 'commandkit';
import { ButtonKit } from 'commandkit';
import { Keys } from '../../keys.js';
// import { log } from '../../utils/once.js';
import { log } from '../../utils/recLog.js';

export default async function (messageInteraction: Message<true>, client: Client<true>, handler: CommandKit) {
  if (
    messageInteraction.guildId !== Keys.cmdGuild ||
    messageInteraction.channelId !== '1174235972515414037' ||
    messageInteraction.author.id === client.user.id
  )
    return;

  //   messageInteraction.channel.send({ embeds: [log()] });

  const button = new ButtonKit().setEmoji('<:plus:940149617683759104>').setStyle(ButtonStyle.Primary).setCustomId('button');

  const buttonRow = new ActionRowBuilder<ButtonKit>().addComponents(button);

  const message = await messageInteraction.channel.send({
    embeds: [log()],
    components: [buttonRow],
  });

  button.onClick(
    (interaction: ButtonInteraction) => {
      // Reply to the interaction
      interaction.reply({ content: `Creating a new instance: recommendation...`, ephemeral: true });
      message.delete();
      messageInteraction.delete();
    },
    { message }
  );
}
