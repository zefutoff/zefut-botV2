const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { rspComponents, logs } = require('../../utils/embed');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'WarnInfo',
    async execute(client, interaction) {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        const warn = db.collection('warn').doc(userId);
        const doc = await warn.get();

        const warn1R = doc._fieldsProto.warn1_reason.stringValue;
        const warn2R = doc._fieldsProto.warn2_reason.stringValue;
        const wDate1 = doc._fieldsProto.warn1_date.stringValue;
        const wDate2 = doc._fieldsProto.warn2_date.stringValue;
        const wAuthor1 = doc._fieldsProto.warn1_author.stringValue;
        const wAuthor2 = doc._fieldsProto.warn2_author.stringValue;
        const warnNbr = doc._fieldsProto.numberWarn.integerValue;

        if (warnNbr == 1)
            rspComponents(
                interaction,
                ':card_box: Liste des avertissements\n',
                `__Avertissement numéro__ 1\n **Raison :** ${warn1R} \nLe *${wDate1}* ~ Par *${wAuthor1}*`,
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Supprimer un avertissement')
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`WarnDel, ${userId}, ${user}`)
                )
            );

        if (warnNbr == 2)
            rspComponents(
                interaction,
                ':card_box: Liste des avertissements\n',
                `__Avertissement numéro__ 1\n **Raison :** ${warn1R} \nLe *${wDate1}* ~ Par *${wAuthor1}*\n
                        __Avertissement numéro__ 2\n **Raison :** ${warn2R}\nLe *${wDate2}* ~ Par *${wAuthor2}*`,
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Supprimer un avertissement')
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId(`WarnDel, ${userId}, ${user}`)
                )
            );

        logs(interaction, 'Information sur les avertissements', `Les avertissements de ${user} on étaient listés.`);
    }
};
