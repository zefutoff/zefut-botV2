const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton, User } = require('discord.js');
const { log } = require('../../utils/channels.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('renommerx')
        .setDescription('Permet de renomer un les utilisateurs')
        .addStringOption(option => option.setName('username').setDescription("Nouveau nom d'utilisateur").setRequired(true)),

    /**
     * @param {CommandInteraction} interaction
     * @returns
     */

    async execute(interaction) {
        const { options } = interaction;

        const error = new MessageEmbed().setColor('RED');
        const response = new MessageEmbed().setColor('GREEN');
        const logs = new MessageEmbed().setColor('RED').setTitle('RenameAll').setTimestamp().setFooter({ text: interaction.member.user.username });

        const Username = options.getString('username');

        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ embeds: [error.setDescription(`❌ Tu n'as pas les permissions requises pour utiliser cette commande !`)], ephemeral: true });
        }

        if (Username.length > 32) {
            return interaction.reply({
                embeds: [error.setDescription(`❌ Les pseudos ne peuvent pas dépasser 32 caractères (Ta proposition contient **${Username.length} caractères**)`)],
                ephemeral: true
            });
        }

        interaction.guild.members.cache.forEach(r =>
            r
                .setNickname(Username)
                .catch(e =>
                    interaction.guild.channels.cache
                        .get(log)
                        .send({ embeds: [logs.setTitle('[Dev] - ERROR').setDescription(`Je ne parviens pas à renommer ${r.user}\n` + e)], ephemeral: true })
                )
        );

        interaction.guild.channels.cache
            .get(log)
            .send({ embeds: [logs.setDescription(`**${interaction.user} à renommer tous les membres du serveur**`)], ephemeral: true });

        return interaction.reply({
            embeds: [response.setDescription(`✅ ${User} à était renommé !`)],
            ephemeral: true
        });
    }
};
