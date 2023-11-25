export default function ({ interaction, commandObj, handler }) {
    if (commandObj.options?.botcmds === false)
        return;
    if (interaction.channel.id !== '1165734848778993704') {
        interaction.reply({
            content: 'This command can only be run in <#1165734848778993704>',
            ephemeral: true,
        });
        return true; // This is important
    }
}
//# sourceMappingURL=options-botcmds.js.map