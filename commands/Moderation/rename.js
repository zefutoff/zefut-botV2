const { PermissionsBitField, EmbedBuilder, CommandInteraction, User, SlashCommandBuilder } = require('discord.js');
const { permError, error, logs, response } = require('../../utils/embed');
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
                .addUserOption(option =>
                    option.setName('user').setDescription("Utilisateur concerné par la demande d'information").setRequired(true)
                )
                .addStringOption(option => option.setName('username').setDescription("Nouveau nom d'utilisateur").setRequired(true))
        ),

    async execute(interaction) {
        const { options } = interaction;

        const Username = options.getString('username');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
            return permError(interaction);
        }

        if (Username.length > 32) {
            return error(
                interaction,
                `❌ Les pseudos ne peuvent pas dépasser 32 caractères (Ta proposition contient **${Username.length} caractères**)`
            );
        }

        if (options.getSubcommand() === 'all') {
            interaction.guild.members.cache.forEach(r =>
                r.setNickname(Username).catch(e => logs(interaction, '[Dev] - ERROR', `Je ne parviens pas à renommer ${r.user}\n \`${e}\``))
            );

            logs(interaction, 'Membre renommé', `**${interaction.user} à renommer tous les membres du serveur**`);

            return response(interaction, `✅ Tous les membres on étaient renommés en **${Username}**`);
        }

        if (options.getSubcommand() === 'user') {
            const User = options.getMember('user');

            interaction.guild.members.cache
                .get(User.id)
                .setNickname(Username)
                .catch(e => logs(interaction, '[Dev] - ERROR', `Je ne parviens pas à renommer ${r.user}\n \`${e}\``));

            logs(interaction, 'Membre renommé', `**${interaction.user} à renommé ${User.user}**`);

            return response(interaction, `✅ ${User.user.tag} à était renommé !`);
        }
    }
};
