const { EmbedBuilder } = require('discord.js');
const { log } = require('./channels.json');

function error(interaction, description) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#ED4245').setDescription(description)],
        ephemeral: true
    });
}

function response(interaction, description) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#57F287').setDescription(description)],
        ephemeral: true
    });
}

function rspButton(interaction, description, button) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#57F287').setDescription(description)],
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

module.exports = { permError, logs, error, response, rspButton };
