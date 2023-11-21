import type { ValidationFunctionProps } from 'commandkit';

export default function ({ interaction, commandObj, handler }: ValidationFunctionProps) {
  if (interaction.channel!.id !== '1165734848778993704') {
    interaction.reply({
      content: 'This command can only be run in <#1165734848778993704>',
      ephemeral: true,
    });

    return true; // This is important
  }
}
