const { TextInputComponent, Client } = require('discord.js');
const { showModal, Modal } = require('discord-modals');
const { token } = require('../../config.json');

const clientModal = new Client({ intents: 32767 });
const discordModals = require('discord-modals');
discordModals(clientModal);

clientModal.login(token);

module.exports = {
    name: 'ReportSubject',
    async execute(client, interaction) {
        const modal = new Modal()
            .setCustomId('explication')
            .addComponents(new TextInputComponent().setCustomId('test').setLabel('Explique nous la situation').setStyle('LONG').setMinLength(100).setRequired(true));

        if (interaction.values.includes('sanction_report')) {
            showModal(modal.setTitle("Contestation d'une santcion"), { client: clientModal, interaction: interaction });
        }
        if (interaction.values.includes('bug_report')) {
            showModal(modal.setTitle('Rapporter un bug'), { client: clientModal, interaction: interaction });
        }
        if (interaction.values.includes('moderator_report')) {
            showModal(modal.setTitle('Litige avec un modérateur'), { client: clientModal, interaction: interaction });
        }
        if (interaction.values.includes('administrator_report')) {
            showModal(modal.setTitle('Litige avec un administrateur'), { client: clientModal, interaction: interaction });
        }
    }
};

clientModal.on('modalSubmit', modal => {
    console.log('1');
    if (modal.customId === 'explication') {
        console.log(modal.fields[0].value);
    }
});
