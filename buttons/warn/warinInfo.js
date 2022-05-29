const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { log } = require('../../utils/channels.json');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'WarnInfo',
    async execute(client, interaction) {
        const response = new MessageEmbed().setColor('GREEN');
        const logs = new MessageEmbed().setColor('RED').setTitle('').setTimestamp().setFooter({ text: interaction.member.user.username });

        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        const warn = db.collection('warn').doc(userId);
        const doc = await warn.get();

        const warn1R = doc._fieldsProto.warn1_reason.stringValue;
        const warn2R = doc._fieldsProto.warn2_reason.stringValue;
        const wDate1 = doc._fieldsProto.warn1_date.stringValue;
        const wDate2 = doc._fieldsProto.warn2_author.stringValue;
        const wAuthor1 = doc._fieldsProto.warn1_author.stringValue;
        const wAuthor2 = doc._fieldsProto.warn2_author.stringValue;
        const warnNbr = doc._fieldsProto.numberWarn.integerValue;

        if (warnNbr == 1)
            interaction.reply({
                embeds: [
                    response
                        .setTitle(':card_box: Liste des avertissements\n')
                        .addField(`__Avertissement numéro__`, `**Raison :** ${warn1R} \nLe *${wDate1}* ~ Par *${wDate2}* `)
                ],
                components: [
                    new MessageActionRow().addComponents(
                        new MessageButton().setLabel('Supprimer un avertissement').setStyle('DANGER').setCustomId(`WarnDel, ${userId}, ${user}`)
                    )
                ],
                ephemeral: true
            });
        if (warnNbr == 2)
            interaction.reply({
                embeds: [
                    response
                        .setTitle(':card_box: Liste des avertissements\n')
                        .addField(`__Avertissement numéro__`, `**Raison :** ${warn1R} \nLe *${wDate1}* ~ Par *${wAuthor1}* `)
                        .addField(`__Avertissement numéro__`, `**Raison :** ${warn2R}\nLe *${wDate2}* ~ Par *${wAuthor2}* `)
                ],
                components: [
                    new MessageActionRow().addComponents(
                        new MessageButton().setLabel('Supprimer un avertissement').setStyle('DANGER').setCustomId(`WarnDel, ${userId}, ${user}`)
                    )
                ],
                ephemeral: true
            });

        interaction.guild.channels.cache.get(log).send({
            embeds: [logs.setTitle('Information sur les vaertissements').setDescription(`Les avertissements de ${user} on étaient listés.`)]
        });
    }
};
