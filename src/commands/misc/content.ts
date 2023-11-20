import { CommandType, type CommandData, type ContextMenuCommandProps, type CommandOptions } from 'commandkit';

export const data: CommandData = {
  name: 'content',
  type: CommandType.User,
};

export function run({ interaction, client, handler }: ContextMenuCommandProps) {
  if (!interaction.isMessageContextMenuCommand()) return;

  console.log(interaction.targetMessage);
  interaction.reply(`The message is: ${interaction.targetMessage}`);
}

export const options: CommandOptions = {
  // devOnly: true,
  // guildOnly: true,
  userPermissions: ['Administrator', 'AddReactions'],
  botPermissions: ['Administrator', 'AddReactions'],
  deleted: false,
};
