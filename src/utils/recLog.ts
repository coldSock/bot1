import { EmbedBuilder } from 'discord.js';

export const log = () =>
  new EmbedBuilder()
    .setColor('#f6bd60')
    .setTitle('Configuration Rules Change')
    .setAuthor({
      name: 'Recommendations',
      iconURL: 'https://cdn3.emoji.gg/emojis/1194-bot.png',
      url: 'https://discord.js.org',
    })
    .addFields(
      {
        name: 'Invoked in Channel',
        value: `${interaction.channel}`,
        inline: false,
      },
      {
        name: 'New Roles',
        value: `${inter.values.join(', ')}`,
        inline: false,
      }
    )
    .setTimestamp()
    .setFooter({
      text: `${client.user.tag}`,
      iconURL: client.user.displayAvatarURL({ dynamic: true }),
    });

export default log;
