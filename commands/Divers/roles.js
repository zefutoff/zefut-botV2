const { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { roles, log } = require('../../utils/channels.json');

module.exports = {
    data: new SlashCommandBuilder().setName('roles').setDescription('Pour choisir les roles et les channels auxquelles tu souhaites accéder !'),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const logs = new EmbedBuilder().setColor('#ED4245').setTitle('Test Roles').setTimestamp().setFooter({ text: interaction.member.user.username });
        const User = interaction.user;
        const response = new EmbedBuilder().setColor('#57F287');

        interaction.guild.channels.cache.get(roles).send({
            content: "Hello toi ! Choisi t'es roles ici :",
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setLabel('Gérer mes roles ').setStyle(ButtonStyle.Primary).setCustomId(`manageRoles, ${User.id}, ${User}`)
                )
            ]
        });

        interaction.reply({ embeds: [response.setDescription(`✅ La commande a été exécutée avec succès !`)], ephemeral: true });

        interaction.guild.channels.cache.get(log).send({
            embeds: [logs.setTitle('Commande roles').setDescription(`${interaction.member.user.user} à utiliser la commande roles.`)]
        });
    }
};
