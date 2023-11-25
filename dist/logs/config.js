import { EmbedBuilder } from 'discord.js';
export const Embed = (interaction, inter, client) => new EmbedBuilder()
    .setColor('#f6bd60')
    .setTitle('Configuration Rules Change')
    .setAuthor({
    name: interaction.user.tag,
    iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
    url: 'https://discord.js.org',
})
    .addFields({ name: 'Database POST request', value: '[ID: N/A](http://example.com)', inline: true }, { name: '\u200B', value: '\u200B', inline: false }, {
    name: 'Invoked in Channel',
    value: `${interaction.channel}`,
    inline: true,
}, {
    name: 'New Roles',
    value: `${inter.values.join(', ')}`,
    inline: true,
})
    .setTimestamp()
    .setFooter({
    text: `${client.user.tag}`,
    iconURL: client.user.displayAvatarURL({ dynamic: true }),
});
export default Embed;
//# sourceMappingURL=config.js.map