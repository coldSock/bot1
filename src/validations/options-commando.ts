import type { ValidationFunctionProps } from 'commandkit';

export default function ({ interaction, commandObj, handler }: ValidationFunctionProps) {
  if (interaction.guild!.id !== '1165699623139164181') {
    interaction.reply({
      content: 'This command can only be run in VU:Commandos.',
      ephemeral: true,
    });

    return true; // This is important
  }
}
