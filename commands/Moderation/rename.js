const { PermissionsBitField, EmbedBuilder, CommandInteraction, User, SlashCommandBuilder } = require('discord.js');
const { log } = require('../../utils/channels.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('renommer')
        .setDescription('Permet de renomer un les utilisateurs')
        .addSubcommand(subcommand =>
            subcommand
                .setName('all')
                .setDescription('Renomme tous les utilisateurs du discord')
                .addStringOption(option => option.setName('username').setDescription("Nouveau nom d'utilisateur").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Renommer un utilisateur')
                .addUserOption(option => option.setName('user').setDescription("Utilisateur concerné par la demande d'information").setRequired(true))
                .addStringOption(option => option.setName('username').setDescription("Nouveau nom d'utilisateur").setRequired(true))
        ),

    /**
     * @param {CommandInteraction} interaction
     * @returns
     */

    async execute(interaction) {
        const { options } = interaction;

        const error = new EmbedBuilder().setColor('#ED4245');
        const response = new EmbedBuilder().setColor('#57F287');
        const logs = new EmbedBuilder().setColor('#ED4245').setTitle('Message clear').setTimestamp().setFooter({ text: interaction.member.user.username });

        const Username = options.getString('username');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
            return interaction.reply({
                embeds: [error.setDescription(`❌ Tu n'as pas les PermissionsBitField requises pour utiliser cette commande !`)],
                ephemeral: true
            });
        }

        if (Username.length > 32) {
            return interaction.reply({
                embeds: [error.setDescription(`❌ Les pseudos ne peuvent pas dépasser 32 caractères (Ta proposition contient **${Username.length} caractères**)`)],
                ephemeral: true
            });
        }

        if (options.getSubcommand() === 'all') {
            interaction.guild.members.cache.forEach(r =>
                r
                    .setNickname(Username)
                    .catch(e =>
                        interaction.guild.channels.cache
                            .get(log)
                            .send({ embeds: [logs.setTitle('[Dev] - ERROR').setDescription(`Je ne parviens pas à renommer ${r.user}\n \`${e}\``)], ephemeral: true })
                    )
            );

            interaction.guild.channels.cache
                .get(log)
                .send({ embeds: [logs.setDescription(`**${interaction.user} à renommer tous les membres du serveur**`)], ephemeral: true });

            return interaction.reply({
                embeds: [response.setDescription(`✅ Tous les membres on étaient renommés en **${Username}**`)],
                ephemeral: true
            });
        }

        if (options.getSubcommand() === 'user') {
            const User = options.getMember('user');

            interaction.guild.members.cache
                .get(User.id)
                .setNickname(Username)
                .catch(e =>
                    interaction.guild.channels.cache
                        .get(log)
                        .send({ embeds: [logs.setTitle('[Dev] - ERROR').setDescription(`Je ne parviens pas à renommer ${r.user}\n \`${e}\``)], ephemeral: true })
                );

            interaction.guild.channels.cache.get(log).send({ embeds: [logs.setDescription(`**${interaction.user} à renommé ${User.user}**`)], ephemeral: true });

            return interaction.reply({
                embeds: [response.setDescription(`✅ ${User.user.tag} à était renommé !`)],
                ephemeral: true
            });
        }
    }
};
