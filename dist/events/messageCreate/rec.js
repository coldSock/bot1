var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ButtonStyle, ActionRowBuilder, ButtonBuilder, } from 'discord.js';
import { Keys } from '../../keys.js';
import { log as begLog } from '../../utils/once.js';
import { log as recLog } from '../../utils/recLog.js';
export default function (interaction, client, handler) {
    return __awaiter(this, void 0, void 0, function* () {
        if (interaction.guildId !== Keys.cmdGuild ||
            interaction.channelId !== '1174235972515414037' ||
            interaction.author.id === client.user.id ||
            interaction.author.id !== '507944419954262027')
            return true;
        interaction.channel.send({ embeds: [begLog()] });
        const button = new ButtonBuilder().setEmoji('<:plus:940149617683759104>').setStyle(ButtonStyle.Primary).setCustomId('button');
        const buttonRow = new ActionRowBuilder().addComponents(button);
        const message = yield interaction.channel.send({
            embeds: [recLog()],
            components: [buttonRow],
        });
    });
}
