import { EmbedBuilder } from 'discord.js';
export const Embed = (oldMember, newMember, oldDisplayRoles, newDisplayRoles, client) => new EmbedBuilder()
    .setColor('#f6bd60')
    .setTitle('# Data Sufficiency Report')
    .setAuthor({
    name: newMember.user.tag,
    iconURL: newMember.user.displayAvatarURL({ dynamic: true }),
    url: 'https://discord.js.org',
})
    .addFields({ name: 'Database POST request ', value: '[ID: N/A](http://example.com)', inline: false }, 
//       { name: '\u200B', value: '\u200B', inline: false },
{
    name: 'Old Roles',
    value: `${oldDisplayRoles}`,
    inline: true,
}, {
    name: 'New Roles',
    value: `${newDisplayRoles}`,
    inline: true,
})
    .setTimestamp()
    .setFooter({
    text: `${client.ws.ping >= 1 ? client.ws.ping : '(instant) 0'}ms`,
    iconURL: 'https://cdn3.emoji.gg/emojis/6218-community-server-public.png',
});
export default Embed;
//# sourceMappingURL=update.js.map