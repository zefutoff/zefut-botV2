import { SelectMenu } from '../clientdata';

import { logs, response } from '../utils/embed';
import { youtube, twitch, Mcreator } from '../utils/roles.json';

export const selectMenu: SelectMenu = {
    name: 'manageRoles',
    async execute(interaction) {
        const data = interaction.customId.split(', ');
        const guild = interaction.guild;

        if (guild === null) {
            return;
            //A faire
        }

        const user = guild.members.cache.get(data[1]);

        if (user === undefined) {
            return;
            //A faire
        }

        const roles = [
            { label: 'YouTube', value: youtube },
            { label: 'Twitch', value: twitch },
            { label: 'Mcreator', value: Mcreator }
        ];

        for (const role of roles) {
            if (interaction.values.includes(role.value)) {
                await user.roles.add(role.value);
            } else if (user.roles.cache.get(role.value)) {
                user.roles.remove(role.value);
            }
        }

        response(interaction, `✅ Tes roles on étaient mis à jour.`);

        logs(interaction, 'Roles', `${user} à modifier ces roles.`);
    }
};
