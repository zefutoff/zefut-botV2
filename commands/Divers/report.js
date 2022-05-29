const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, Permissions, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { log } = require('../../utils/channels.json');

module.exports = {
    data: new SlashCommandBuilder().setName('signaler').setDescription('Permet de signaler à un administrateur/Zefut un problème de grande importance.'),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const response = new MessageEmbed().setColor('GREEN');
        const error = new MessageEmbed().setColor('RED');
        const logs = new MessageEmbed().setColor('RED').setTitle('').setTimestamp().setFooter({ text: interaction.member.user.username });

        if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ embeds: [error.setDescription(`❌ Tu n'as pas accès à cette commande en tant qu'adiministrateur !`)], ephemeral: true });
        }

        interaction.reply({
            embeds: [
                response
                    .setTitle(`:warning: ${interaction.member.user.username} cette commande peut avoir de lourde conséquences :warning:`)
                    .addField("__Contestation d'une sanction__", "Si les administrateurs estimes que ta contestation n'es pas fondée, elle sera automatiquement doublé.")
                    .addField(
                        '__Raporter un bug__',
                        "Avant de nous signaler un de ces problèmes assure toi que le staff n'est pas dèjà au courant (passe faire un tour dans le salon annonce par exemples)"
                    )
                    .addField(
                        '__Problème avec un modérateur__',
                        "Les administrateurs et que Zefut etudirons tous ces signalements, si ils ne sont pas fondés la sanction pourrait aller jusqu'au banissement definitif"
                    )
                    .addField(
                        '__Problème avec un administrateur__',
                        "Zefut etudira tous ces signalements, si ils ne sont pas fondés la sanction pourrait aller jusqu'au banissement definitif"
                    )
                    .setDescription(`Une fois que tu as pris connaissance de toutes ces informations nous t'inviterons à choisir la raison de ton signalement :`)
            ],
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId(`ReportSubject, ${interaction.member.user.id}, ${interaction.member.user}`)
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
            embeds: [logs.setTitle('Tentative de signalement').setDescription(`${interaction.member.user.user} à fait appel à utiliser la commande de signalement.`)]
        });
    }
};
