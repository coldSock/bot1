import { EmbedBuilder } from 'discord.js';

export const Embed = () =>
  new EmbedBuilder()
    .setColor('#f6bd60')
    .setAuthor({
      name: 'High Rank Only',
      iconURL: 'https://cdn3.emoji.gg/emojis/1194-bot.png',
      url: 'https://discord.js.org',
    })
    .setDescription(
      `
        ### :clipboard: __Recommendation Form__\nHigh Ranks reserve a right to recommend a Commando for whatever valid reason. They may also respectievely remove a recommendation for bad reputation.\n * To submit a recommendation form, interact with the button below
        `
    )
    .setFooter({
      text: `Commando Team`,
      iconURL: 'https://cdn3.emoji.gg/emojis/6218-community-server-public.png',
    });

export default Embed;
