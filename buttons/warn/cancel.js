const { MessageEmbed } = require('discord.js');
const { log } = require('../../utils/channels.json');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'False',
    async execute(client, interaction) {
        const error = new MessageEmbed().setColor('RED');

        interaction.reply({ embeds: [error.setDescription(`❌ Le warn à était annulé.`)], ephemeral: true });
    }
};
