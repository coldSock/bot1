export default function ({ interaction, commandObj, handler }) {
    if (commandObj.options?.botcmds === false)
        return;
    if (interaction.guild.id !== '1165699623139164181') {
        interaction.reply({
            content: 'This command can only be run in VU:Commandos.',
            ephemeral: true,
        });
        return true; // This is important
    }
}
//# sourceMappingURL=options-commando.js.map