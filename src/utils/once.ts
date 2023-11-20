import { EmbedBuilder } from 'discord.js';

export const log = () =>
  new EmbedBuilder()
    .setColor('#f6bd60')
    .setAuthor({
      name: 'Recommendations',
      iconURL: 'https://cdn3.emoji.gg/emojis/8348-mitglieder.png',
      url: 'https://discord.js.org',
    })
    .setDescription(
      `
      ### 1. :pushpin: __This channel is for recommendations only:__\n* You may post your recommendation __submissions__ in <#1174248062131109888>\n* Forward any questions regarding submissions to <@1149801844655263764>\n\n### 2. :mountain_snow: __Prove yourself in a set of challanges:__\n* The first obstacle you have to get over is [ZAC Challange](https://www.roblox.com/games/2446927310/Zombie-Aim-Challenge):\n * For **five** continous minutes, you must survive from being killed\n * Then you must take a screenshot of your full screen, including the date in bottom right, toggeled leaderboard and the /leaderboard command ran in the chat\n* The second challange is [th3ltgrounds](https://www.roblox.com/games/2996067865/th3ltgrounds):\n * You are to reach a total of **100** kills\n * To correctly measure your kills, you must take a screenshot of the starting point (i.e how many kills you have when you joined the game), and at the end, after you earn the estabilished amount of kills\n * Same rules for screenshots apply as in the first challange\n\n### 3. :envelope: __Submit your challanges:__\n* Make sure you follow the format posted in the channel\n\n### 4. :mag: __Reviewing process__\n**DO NOT** ping any staff member to review your submission\n* Submissions are reviewed when a staff member is currently available, so unnecessary contact with staff members regarding the status of your submission will result in punishment\n * as stated before, for any actual problems contact <@1149801844655263764>\n* Staff members will mark your submission with :white_check_mark: and :x: for respectively, confirmation and denial of your submission\n* If a reason for denial is not listed, you may contact the staff member that reviewed your submission\n\n
      `
    )
    .setFooter({
      text: `Commando Team`,
      iconURL: 'https://cdn3.emoji.gg/emojis/6218-community-server-public.png',
    });

export default log;
