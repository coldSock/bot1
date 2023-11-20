var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ButtonStyle, ActionRowBuilder, UserSelectMenuBuilder, ComponentType } from 'discord.js';
import { ButtonKit } from 'commandkit';
import { Keys } from '../../keys.js';
import { log as begLog } from '../../utils/once.js';
import { log as recLog } from '../../utils/recLog.js';
export default function (messageInteraction, client, handler) {
    return __awaiter(this, void 0, void 0, function* () {
        if (messageInteraction.guildId !== Keys.cmdGuild ||
            messageInteraction.channelId !== '1174235972515414037' ||
            messageInteraction.author.id === client.user.id ||
            messageInteraction.author.id !== '507944419954262027')
            return;
        messageInteraction.channel.send({ embeds: [begLog()] });
        const button = new ButtonKit().setEmoji('<:plus:940149617683759104>').setStyle(ButtonStyle.Primary).setCustomId('button');
        const buttonRow = new ActionRowBuilder().addComponents(button);
        const message = yield messageInteraction.channel.send({
            embeds: [recLog()],
            components: [buttonRow],
        });
        button.onClick((interaction) => __awaiter(this, void 0, void 0, function* () {
            const userSelect = new UserSelectMenuBuilder()
                .setCustomId(interaction.id)
                .setPlaceholder(`Select the user to be recommended...`)
                .setMinValues(0)
                .setMaxValues(10);
            console.log(interaction);
            const actionRow = new ActionRowBuilder().addComponents(userSelect);
            const reply = yield interaction.reply({
                content: 'test',
                components: [actionRow],
            });
            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.UserSelect,
                // filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
                time: 60000,
            });
            console.log(collector);
            collector.on('collect', (interaction) => __awaiter(this, void 0, void 0, function* () {
                if (interaction.values.lenght) {
                    interaction.reply('You must select at least one role!');
                    return;
                }
                messageInteraction.channel.send({ content: 'test' });
            }));
            collector.on('end', (reason) => __awaiter(this, void 0, void 0, function* () {
                const logChannel = yield client.channels.fetch(Keys.logChannel);
                yield logChannel.send({ contents: 'test' });
            }));
        }), { message });
    });
}
