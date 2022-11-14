const { TextInputBuilder, Client, EmbedBuilder, ModalBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { showModal } = require('discord-modals'); //A verifier
const { token } = require('../../config.json');
const { administrator } = require('../../utils/channels.json');

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

        if (interaction.values.includes('sanction_report')) {
            interaction.showModal(modal.setTitle("Contestation d'une santcion").setCustomId('sanction_report'), {
                client: clientModal,
                interaction: interaction
            });
        }
        if (interaction.values.includes('bug_report')) {
            interaction.showModal(modal.setTitle('Rapporter un bug').setCustomId('bug_report'), {
                client: clientModal,
                interaction: interaction
            });
        }
        if (interaction.values.includes('moderator_report')) {
            interaction.showModal(modal.setTitle('Litige avec un modérateur').setCustomId('moderator_report'), {
                client: clientModal,
                interaction: interaction
            });
        }
        if (interaction.values.includes('administrator_report')) {
            interaction.showModal(modal.setTitle('Litige avec un administrateur').setCustomId('administrator_report'), {
                client: clientModal,
                interaction: interaction
            });
        }
    }
};

clientModal.on('modalSubmit', modal => {
    console.log('is modal !');
    const report = new EmbedBuilder().setTimestamp().setFooter({ text: modal.member.user.username });
    const response = new EmbedBuilder().setColor('#57F287');
    if (modal.customId === 'sanction_report') {
        console.log('is sanction !');
        modal.guild.channels.cache.get(administrator).send({
            embeds: [report.setTitle(`${modal.member.user.username} conteste une sanction`).setDescription(modal.fields[0].value)]
        });
        modal.reply({
            embeds: [response.setDescription(`✅ ta demande à était transmise aux administrateurs !`)],
            ephemeral: true
        });
    }
    if (modal.customId === 'bug_report') {
        modal.guild.channels.cache.get(administrator).send({
            embeds: [report.setTitle(`${modal.member.user.username} à trouver un bug`).setDescription(modal.fields[0].value)]
        });
        modal.reply({
            embeds: [response.setDescription(`✅ ta demande à était transmise aux administrateurs !`)],
            ephemeral: true
        });
    }
    if (modal.customId === 'moderator_report') {
        modal.guild.channels.cache.get(administrator).send({
            embeds: [
                report
                    .setTitle(`${modal.member.user.username} rencontre un problème avec un modérateur`)
                    .setDescription(modal.fields[0].value)
            ]
        });
        modal.reply({
            embeds: [response.setDescription(`✅ ta demande à était transmise aux administrateurs !`)],
            ephemeral: true
        });
    }
    if (modal.customId === 'administrator_report') {
        modal.guild.members.cache.get('386931324042084354').send({
            embeds: [
                report
                    .setTitle(`${modal.member.user.username} rencontre un problème avec un administrateur`)
                    .setDescription(modal.fields[0].value)
            ]
        });
        modal.reply({
            embeds: [response.setDescription(`✅ ta demande à était transmise à Zefut !`)],
            ephemeral: true
        });
    }
});
