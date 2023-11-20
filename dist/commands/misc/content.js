import { CommandType } from 'commandkit';
export const data = {
    name: 'content',
    type: CommandType.User,
};
export function run({ interaction, client, handler }) {
    if (!interaction.isMessageContextMenuCommand())
        return;
    console.log(interaction.targetMessage);
    interaction.reply(`The message is: ${interaction.targetMessage}`);
}
export const options = {
    // devOnly: true,
    // guildOnly: true,
    userPermissions: ['Administrator', 'AddReactions'],
    botPermissions: ['Administrator', 'AddReactions'],
    deleted: false,
};
