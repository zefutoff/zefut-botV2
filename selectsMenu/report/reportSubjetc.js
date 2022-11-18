const { TextInputBuilder, Client, ModalBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { showModal } = require('discord-modals'); //A verifier
const { rspModal, sendModal } = require('../../utils/embed');
const { token } = require('../../config.json');

const clientModal = new Client({ intents: 32767 });
const discordModals = require('discord-modals');
discordModals(clientModal);

clientModal.login(token);

module.exports = {
    name: 'ReportSubject',
    async execute(client, interaction) {
        const modal = new ModalBuilder().setComponents(
            new ActionRowBuilder().setComponents(
                new TextInputBuilder()
                    .setCustomId('comment')
                    .setLabel('Explique nous la situation')
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(100)
                    .setRequired(true)
            )
        );

        function show(title, id) {
            interaction.showModal(modal.setTitle(title).setCustomId(id), {
                client: clientModal,
                interaction: interaction
            });
        }

        if (interaction.values.includes('sanction_report')) {
            show("Contestation d'une santcion", 'sanction_report');
        }

        if (interaction.values.includes('bug_report')) {
            show('Rapporter un bug', 'bug_report');
        }

        if (interaction.values.includes('moderator_report')) {
            show('Litige avec un modérateur', 'moderator_report');
        }

        if (interaction.values.includes('administrator_report')) {
            show('Litige avec un administrateur', 'administrator_report');
        }
    }
};

clientModal.on('modalSubmit', modal => {
    if (modal.customId === 'sanction_report') {
        sendModal(modal, ` conteste une sanction`);
        rspModal(modal, 'administrateurs');
    }

    if (modal.customId === 'bug_report') {
        sendModal(modal, ` à trouver un bug`);
        rspModal(modal, 'aux administrateurs');
    }

    if (modal.customId === 'moderator_report') {
        sendModal(modal, ` rencontre un problème avec un modérateur`);
        rspModal(modal, 'aux administrateurs');
    }

    if (modal.customId === 'administrator_report') {
        sendModal(modal, ` rencontre un problème avec un administrateur`);
        rspModal(modal, 'à Zefut');
    }
});
