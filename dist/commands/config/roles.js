var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RoleSelectMenuBuilder, ActionRowBuilder } from 'discord.js';
import { Keys } from '../../keys.js';
import { log } from '../../utils/configLog.js';
export const data = {
    name: 'roles',
    description: 'Configure roles for the database eco-systema.',
    options: [
        {
            name: 'type',
            description: 'Select the type of roles to modify',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'Officers',
                    value: 'oc',
                },
                {
                    name: 'High Command',
                    value: 'hc',
                },
            ],
        },
    ],
};
/**
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0
 */
export function run({ interaction, client, handler }) {
    return __awaiter(this, void 0, void 0, function* () {
        const subcommand = yield interaction.options.getString('type', true);
        // if (!interaction.guild) return;
        // const roles: APIRole = interaction.guild.roles.cache.values();
        // if (!roles) return;
        // const ignoredRoles: Array<string> = ['@everyone', '▬▬▬▬▬▬▬', 'Dyno', 'Group Holder', '[DEV]: Vexus Engineers', 'Vexonian', 'Authorized'];
        // const filteredRoles = roles
        //   .values()
        //   .filter((role: any) => !ignoredRoles.includes(role.name))
        //   .map((role: any) => role)
        //   .join(', ');
        // console.log(filteredRoles);
        const roleSelect = new RoleSelectMenuBuilder()
            .setCustomId(interaction.id)
            .setPlaceholder(`Select the ${subcommand} roles...`)
            .setMinValues(1)
            .setMaxValues(25);
        const actionRow = new ActionRowBuilder().addComponents(roleSelect);
        const reply = yield interaction.reply({
            components: [actionRow],
        });
        const collector = reply.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
            time: 60000,
        });
        collector.on('collect', (inter) => __awaiter(this, void 0, void 0, function* () {
            if (inter.values.lenght) {
                inter.reply('You must select at least one role!');
                return;
            }
            const logChannel = yield client.channels.fetch(Keys.logChannel);
            const logInvoke = log(interaction, inter, client);
            yield logChannel.send({ embeds: [logInvoke] });
            interaction.deleteReply();
        }));
        collector.on('end', (collected, reason) => {
            if (collected.size === 0) {
                reply.edit({ content: `You did not select any roles! ${reason}`, components: [] });
            }
        });
        collector.on('error', (err) => {
            console.error(err);
        });
    });
}
export const options = {
    // devOnly: true,
    // guildOnly: true,
    userPermissions: ['Administrator', 'AddReactions'],
    botPermissions: ['Administrator', 'AddReactions'],
    deleted: false,
};
