import { EmbedBuilder } from 'discord.js';

export const Embed = (interaction: any, recNum: number, discordId: any, client: any) =>
  new EmbedBuilder()
    .setColor('#f6bd60')
    .setTitle(interaction.user.username)
    .setURL('https://discord.js.org')
    .setAuthor({
      name: 'Recommendations',
      iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      url: 'https://discord.js.org',
    })
    .setDescription(`You have ${recNum} recommendations.`)
    .setTimestamp();
//     .setFooter({
//       text: `${client.user.tag}`,
//       iconURL: client.user.displayAvatarURL({ dynamic: true }),
//     });

export default Embed;
