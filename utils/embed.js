const { EmbedBuilder } = require('discord.js');

const { log, administrator } = require('./channels.json');

function error(interaction, description) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#ED4245').setDescription(description)],
        ephemeral: true
    });
}

function sendModal(modal, title) {
    modal.guild.channels.cache.get(administrator).send({
        embeds: [new EmbedBuilder().setTitle(modal.member.user.username + title).setDescription(modal.fields[0].value)]
    });
}

function response(interaction, description) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#57F287').setDescription(description)],
        ephemeral: true
    });
}

function rspInfo(interaction, description, User) {
    return interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setColor('#57F287')
                .setThumbnail(User.displayAvatarURL())
                .setTitle(`Voici les informations concernant ${User.user.username} :`)
                .setDescription(description)
                .setTimestamp()
        ],
        ephemeral: true
    });
}

function rspInfoComp(interaction, title, description, avatar, button) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#57F287').setThumbnail(avatar).setTitle(title).setDescription(description).setTimestamp()],
        components: [button],
        ephemeral: true
    });
}

function rspModal(interaction, target) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#57F287').setDescription(`✅ ta demande à était transmise ${target} !`)],
        ephemeral: true
    });
}

function rspComponents(interaction, title, description, button) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setTitle(title).setColor('#57F287').setDescription(description)],
        components: [button],
        ephemeral: true
    });
}

function permError(interaction) {
    return interaction.reply({
        embeds: [
            new EmbedBuilder().setColor('#ED4245').setDescription(`❌ Tu n'as pas les permissions requises pour utiliser cette commande !`)
        ],
        ephemeral: true
    });
}

function logs(interaction, title, description) {
    return interaction.guild.channels.cache.get(log).send({
        embeds: [
            new EmbedBuilder()
                .setColor('#ED4245')
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()
                .setFooter({ text: interaction.member.user.username })
        ]
    });
}

module.exports = { permError, logs, error, response, rspComponents, rspInfo, rspInfoComp, rspModal, sendModal };
