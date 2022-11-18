const { CommandInteraction, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } = require('discord.js');
const { logs, rspComponents } = require('../../utils/embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('signaler')
        .setDescription('Permet de signaler à un administrateur/Zefut un problème de grande importance.'),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        rspComponents(
            interaction,
            `:warning: ${interaction.member.user.username} cette commande peut avoir de lourde conséquences :warning:`,
            "__**Contestation d'une sanction**__\n Si les administrateurs estimes que ta contestation n'es pas fondée, elle sera automatiquement doublé.\n \n __**Raporter un bug**__\n Avant de nous signaler un de ces problèmes assure toi que le staff n'est pas dèjà au courant (passe faire un tour dans le salon annonce par exemples)\n \n __**Problème avec un modérateur**__\nLes administrateurs et que Zefut etudirons tous ces signalements, si ils ne sont pas fondés la sanction pourrait aller jusqu'au banissement definitif.\n \n __**Problème avec un administrateur**__\n Zefut etudira tous ces signalements, si ils ne sont pas fondés la sanction pourrait aller jusqu'au banissement definitif",
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
        );

        logs(interaction, 'Signalement', `${interaction.member.user.user} à fait appel à utiliser la commande de signalement.`);
    }
};
