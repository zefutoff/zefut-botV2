const { TextInputComponent, Client, MessageEmbed } = require('discord.js');
const { showModal, Modal } = require('discord-modals');
const { token } = require('../../config.json');
const { log, administrator } = require('../../utils/channels.json');

const clientModal = new Client({ intents: 32767 });
const discordModals = require('discord-modals');
discordModals(clientModal);

clientModal.login(token);

module.exports = {
    name: 'ReportSubject',
    async execute(client, interaction) {
        const modal = new Modal().addComponents(
            new TextInputComponent().setCustomId('test').setLabel('Explique nous la situation').setStyle('LONG').setMinLength(100).setRequired(true)
        );

        if (interaction.values.includes('sanction_report')) {
            showModal(modal.setTitle("Contestation d'une santcion").setCustomId('sanction_report'), { client: clientModal, interaction: interaction });
        }
        if (interaction.values.includes('bug_report')) {
            showModal(modal.setTitle('Rapporter un bug').setCustomId('bug_report'), { client: clientModal, interaction: interaction });
        }
        if (interaction.values.includes('moderator_report')) {
            showModal(modal.setTitle('Litige avec un modérateur').setCustomId('moderator_report'), { client: clientModal, interaction: interaction });
        }
        if (interaction.values.includes('administrator_report')) {
            showModal(modal.setTitle('Litige avec un administrateur').setCustomId('administrator_report'), { client: clientModal, interaction: interaction });
        }
    }
};

clientModal.on('modalSubmit', modal => {
    const report = new MessageEmbed().setTimestamp().setFooter({ text: modal.member.user.username });
    const response = new MessageEmbed().setColor('GREEN');
    if (modal.customId === 'sanction_report') {
        modal.guild.channels.cache.get(administrator).send({ embeds: [report.setTitle(`${modal.member.user.username} conteste une sanction`).setDescription(modal.fields[0].value)] });
        modal.reply({embeds: [response.setDescription(`✅ ta demande à était transmise aux administrateurs !`)], ephemeral: true});
        
    }
    if (modal.customId === 'bug_report') {
        modal.guild.channels.cache.get(administrator).send({ embeds: [report.setTitle(`${modal.member.user.username} à trouver un bug`).setDescription(modal.fields[0].value)] });
        modal.reply({embeds: [response.setDescription(`✅ ta demande à était transmise aux administrateurs !`)], ephemeral: true});
        
    }
    if (modal.customId === 'moderator_report') {
        modal.guild.channels.cache.get(administrator).send({ embeds: [report.setTitle(`${modal.member.user.username} rencontre un problème avec un modérateur`).setDescription(modal.fields[0].value)] });
        modal.reply({embeds: [response.setDescription(`✅ ta demande à était transmise aux administrateurs !`)], ephemeral: true});
        
    }
    if (modal.customId === 'administrator_report') {
        modal.guild.members.cache.get('386931324042084354').send({ embeds: [report.setTitle(`${modal.member.user.username} rencontre un problème avec un administrateur`).setDescription(modal.fields[0].value)] });
        modal.reply({embeds: [response.setDescription(`✅ ta demande à était transmise à Zefut !`)], ephemeral: true});
        
    }
});
