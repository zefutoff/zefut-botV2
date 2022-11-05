const { CommandInteraction, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } = require('discord.js');
const { log } = require('../../utils/channels.json');

module.exports = {
    data: new SlashCommandBuilder().setName('signaler').setDescription('Permet de signaler à un administrateur/Zefut un problème de grande importance.'),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const response = new EmbedBuilder().setColor('#57F287');
        const logs = new EmbedBuilder().setColor('#ED4245').setTitle('test').setTimestamp().setFooter({ text: interaction.member.user.username });

        interaction.reply({
            embeds: [
                response
                    .setTitle(`:warning: ${interaction.member.user.username} cette commande peut avoir de lourde conséquences :warning:`)
                    .addFields([
                        {
                            name: "__Contestation d'une sanction__",
                            value: "Si les administrateurs estimes que ta contestation n'es pas fondée, elle sera automatiquement doublé."
                        },
                        {
                            name: '__Raporter un bug__',
                            value: "Avant de nous signaler un de ces problèmes assure toi que le staff n'est pas dèjà au courant (passe faire un tour dans le salon annonce par exemples)"
                        },
                        {
                            name: '__Problème avec un modérateur__',
                            value: "Les administrateurs et que Zefut etudirons tous ces signalements, si ils ne sont pas fondés la sanction pourrait aller jusqu'au banissement definitif"
                        },
                        {
                            name: '__Problème avec un administrateur__',
                            value: "Zefut etudira tous ces signalements, si ils ne sont pas fondés la sanction pourrait aller jusqu'au banissement definitif"
                        }
                    ])
                    .setDescription(`Une fois que tu as pris connaissance de toutes ces informations nous t'inviterons à choisir la raison de ton signalement :`)
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
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
