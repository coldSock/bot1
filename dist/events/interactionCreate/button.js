/**
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
 */
export default function (interaction, client, handler) {
    if (!interaction.isButton())
        return;
    if (interaction.customId === 'button') {
        interaction.reply('Button clicked!');
    }
}
