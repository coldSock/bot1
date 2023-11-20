import type { ValidationFunctionProps } from 'commandkit';

export default function ({ interaction, commandObj, handler }: ValidationFunctionProps) {
  if (interaction.user.id !== '507944419954262027') {
    return true;
  }
}
