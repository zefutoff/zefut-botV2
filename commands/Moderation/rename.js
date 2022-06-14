const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, CommandInteraction } = require('discord.js');
const { log } = require('../../utils/channels.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('renommer')
        .setDescription('Permet de renomer un les utilisateurs')
        .addUserOption(option => option.setName('user').setDescription("Utilisateur concerné par la demande d'information").setRequired(true))
        .addStringOption(option => option.setName('username').setDescription("Nouveau nom d'utilisateur").setRequired(true)),

    /**
     * @param {CommandInteraction} interaction
     * @returns
     */

    async execute(interaction) {
        const { options } = interaction;

        const error = new MessageEmbed().setColor('RED');
        const response = new MessageEmbed().setColor('GREEN');
        const logs = new MessageEmbed().setColor('RED').setTitle('Message clear').setTimestamp().setFooter({ text: interaction.member.user.username });

        const User = options.getMember('user');

        const Username = options.getString('username');

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) {
            return interaction.reply({ embeds: [error.setDescription(`❌ Tu n'as pas les permissions requises pour utiliser cette commande !`)], ephemeral: true });
        }

        if (Username.length > 32) {
            return interaction.reply({
                embeds: [error.setDescription(`❌ Les pseudos ne peuvent pas dépasser 32 caractères (Ta proposition contient **${Username.length} caractères**)`)],
                ephemeral: true
            });
        }

        interaction.guild.members.cache.get(User.id).setNickname(Username);

        interaction.guild.channels.cache.get(log).send({ embeds: [logs.setDescription(`**${interaction.user} à renommé ${User.user}**`)], ephemeral: true });

        return interaction.reply({
            embeds: [response.setDescription(`✅ ${User} à était renommé !`)],
            ephemeral: true
        });
    }
};
