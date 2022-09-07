const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { log } = require('../../utils/channels.json');
const { youtube, twitch, Mcreator } = require('../../utils/roles.json');

module.exports = {
    name: 'manageRoles',
    async execute(client, interaction) {
        const logs = new MessageEmbed().setColor('RED').setTitle('').setTimestamp().setFooter({ text: interaction.member.user.username });

        const response = new MessageEmbed().setColor('GREEN');

        interaction.reply({
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
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

        interaction.guild.channels.cache.get(log).send({
            embeds: [logs.setTitle('Gérer roles').setDescription(`a utilisé la commande de modification des roles`)]
        });
    }
};
