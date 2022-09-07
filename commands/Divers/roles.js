const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { roles, log } = require('../../utils/channels.json');
const { twitch, epic, insta, utip, site } = require('../../utils/emoji.json');

module.exports = {
    data: new SlashCommandBuilder().setName('roles').setDescription('Pour choisir les roles et les channels auxquelles tu souhaites accéder !'),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const logs = new MessageEmbed().setColor('RED').setTitle('').setTimestamp().setFooter({ text: interaction.member.user.username });
        const User = interaction.user;
        const response = new MessageEmbed().setColor('GREEN');

        interaction.guild.channels.cache.get(roles).send({
            content: "Hello toi ! Choisi t'es roles ici :",
            components: [
                new MessageActionRow().addComponents(new MessageButton().setLabel('Gérer mes roles ').setStyle('PRIMARY').setCustomId(`manageRoles, ${User.id}, ${User}`))
            ]
        });

        interaction.guild.channels.cache.get(log).send({
            embeds: [logs.setTitle('Commande roles').setDescription(`${interaction.member.user.user} à utiliser la commande roles.`)]
        });
    }
};
