const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { roles } = require('../../utils/channels.json');
const { twitch, epic, insta, utip, site } = require('../../utils/emoji.json');

module.exports = {
    data: new SlashCommandBuilder().setName('roles').setDescription('Pour choisir les roles et les channels auxquelles tu souhaites accéder !'),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const User = interaction.user;
        interaction.guild.channels.cache.get(roles).send({
            embeds: [
                new MessageEmbed()
                    .setTitle('Dernière ligne droite !')
                    .setDescription('Il ne te reste plus qu\'à choisir tes rôles, à l\'aide de la commande "**/roles**" ou en cliquand sur le bouton ci-dessous')
            ],
            components: [
                new MessageActionRow().addComponents(new MessageButton().setLabel('Gérer mes roles ').setStyle('PRIMARY').setCustomId(`roles, ${User.id}, ${User}`))
            ]
        });
    }
};
