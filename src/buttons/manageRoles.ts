import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { Buttons } from '../clientdata';
import { logs, rspComponents } from '../utils/embed';
import { youtube, twitch, Mcreator } from '../utils/roles.json';

export const button: Buttons = {
    name: 'manageRoles',
    execute: async interaction => {
        const { member } = interaction;
        if (!member) return;

        if (Array.isArray(member.roles)) return console.warn('FAUT REGLER LKE PB LA (manageRoles.ts)');

        const options = [
            {
                label: 'YouTube',
                value: youtube,
                default: member.roles.cache.has(youtube)
            },
            {
                label: 'Twitch',
                value: twitch,
                default: member.roles.cache.has(twitch)
            },
            {
                label: 'Mcreator',
                value: Mcreator,
                default: member.roles.cache.has(Mcreator)
            }
        ];

        rspComponents(
            interaction,
            '',
            '',
            new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                    .setMaxValues(3)
                    .setCustomId(`manageRoles, ${interaction.member?.user.id}, ${interaction.member?.user}`)
                    .setPlaceholder('Aucun sujet selectionné')
                    .addOptions(options)
            )
        );

        logs(interaction, 'Gérer roles', `a utilisé la commande de modification des roles`);
    }
};
