const {
    CommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    PermissionsBitField,
    ButtonStyle,
    SlashCommandBuilder
} = require('discord.js');
const { roles } = require('../../utils/channels.json');
const { response, logs } = require('../../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Pour choisir les roles et les channels auxquelles tu souhaites accéder !'),

    async execute(interaction) {
        const User = interaction.user;
        const msg = {
            content: "Hello toi ! Choisi t'es roles ici :",
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Gérer mes roles ')
                        .setStyle(ButtonStyle.Primary)
                        .setCustomId(`manageRoles, ${User.id}, ${User}`)
                )
            ],
            ephemeral: true
        };

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply(msg);
        }

        interaction.guild.channels.cache.get(roles).send(msg);

        response(interaction, `✅ La commande a été exécutée avec succès !`);

        logs(interaction, 'Roles', `${interaction.member.user.user} à utiliser la commande roles.`);
    }
};
