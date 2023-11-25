import { EmbedBuilder } from 'discord.js';
export const Embed = (oldMember, newMember, oldRole, newRole, client) => new EmbedBuilder()
    .setColor('#f6bd60')
    .setTitle(newMember.user.tag)
    .setURL('https://discord.js.org')
    .setAuthor({
    name: newMember.user.displayName,
    iconURL: newMember.user.displayAvatarURL({ dynamic: true }),
    url: 'https://discord.js.org',
})
    .setDescription(`### <:folder_open:1177272545976799312> __Data Report__\n\n`)
    .addFields({
    name: '**Old Role**',
    value: `<:Asset5:1177282027066757170>  ${oldRole}`,
    inline: true,
}, {
    name: '**New Role**',
    value: `<:Asset5:1177282027066757170>  ${newRole}`,
    inline: true,
})
    .setTimestamp()
    .setFooter({
    text: `${client.ws.ping >= 1 ? client.ws.ping : '(instant) 0'}ms`,
    iconURL: 'https://cdn3.emoji.gg/emojis/6218-community-server-public.png',
});
export default Embed;
//# sourceMappingURL=update.js.map