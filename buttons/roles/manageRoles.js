const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { logs } = require('../../utils/embed');
const { youtube, twitch, Mcreator } = require('../../utils/roles.json');

module.exports = {
    name: 'manageRoles',
    async execute(client, interaction) {
        interaction.reply({
            components: [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                        .setMaxValues(3)
                        .setCustomId(`manageRoles, ${interaction.member.user.id}, ${interaction.member.user}`)
                        .setPlaceholder('Aucun sujet selectionné')
                        .addOptions([
                            {
                                label: 'YouTube',
                                value: youtube
                            },
                            {
                                label: 'Twitch',
                                value: twitch
                            },
                            {
                                label: 'Mcreator',
                                value: Mcreator
                            }
                        ])
                )
            ],
            ephemeral: true
        });

        logs(interaction, 'Gérer roles', `a utilisé la commande de modification des roles`);
    }
};
