import { EmbedBuilder } from 'discord.js';

export const upLog = (oldMember: any, newMember: any, oldDisplayRoles: any, newDisplayRoles: any, client: any) =>
  new EmbedBuilder()
    .setColor('#f6bd60')
    .setTitle('Data Sufficiency Report')
    .setAuthor({
      name: newMember.user.tag,
      iconURL: newMember.user.displayAvatarURL(),
      url: 'https://discord.js.org',
    })
    .addFields(
      { name: 'Database POST request', value: '[ID: N/A](http://example.com)', inline: true },
      { name: '\u200B', value: '\u200B', inline: false },
      {
        name: 'Old Roles',
        value: `${oldDisplayRoles}`,
        inline: true,
      },
      {
        name: 'New Roles',
        value: `${newDisplayRoles}`,
        inline: true,
      }
    )
    .setTimestamp()
    .setFooter({
      text: `${client.user.tag}`,
      iconURL: client.user.displayAvatarURL({ dynamic: true }),
    });

export default upLog;
