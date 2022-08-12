//AddWarn
const { Interaction } = require('discord.js');
const { log } = require('../../utils/channels.json');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'manageRoles',
    async execute(client, interaction) {
        interaction.reply({
            embeds: [response.setDescription(`✅ ${user} **a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 3**`)],
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId(`rolesList, ${interaction.member.user.id}, ${interaction.member.user}`)
                        .setPlaceholder('Aucun sujet selectionné')
                        .addOptions([
                            {
                                label: "Contestation d'une sanction",
                                value: 'sanction_report'
                            },
                            {
                                label: 'Rapporter un bug',
                                value: 'bug_report'
                            },
                            {
                                label: 'Problème avec un modérateur',
                                value: 'moderator_report'
                            },
                            {
                                label: 'Problème avec un administrateur',
                                value: 'administrator_report'
                            }
                        ])
                )
            ],
            ephemeral: true
        });

        interaction.guild.channels.cache.get(log).send({
            embeds: [logs.setTitle('Gérer roles').setDescription(`${user} a utilisé la commande de modification des roles`)]
        });
    }
};
