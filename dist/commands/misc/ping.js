export const data = {
    name: 'ping',
    description: 'Pong!',
};
export function run({ interaction, client, handler }) {
    interaction.reply(`:ping_pong: Pong! ${client.ws.ping}ms`);
}
export const options = {
    devOnly: true,
    guildOnly: true,
    userPermissions: ['Administrator', 'AddReactions'],
    botPermissions: ['Administrator', 'AddReactions'],
    deleted: false,
};
