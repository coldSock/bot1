/* general imports */
import { AttachmentBuilder } from 'discord.js';
export default function (c, client, handler) {
    const logo = new AttachmentBuilder('../assets/botLogo@3.png');
    console.log(`${c.user.username} is ready!`);
    client.user.setActivity('Vexus', { type: 3 });
    return true;
}
//# sourceMappingURL=activity.js.map