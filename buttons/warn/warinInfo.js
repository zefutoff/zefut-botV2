const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { log } = require('../../utils/channels.json');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'WarnInfo',
    async execute(client, interaction) {
        const response = new EmbedBuilder().setColor('#57F287');
        const logs = new EmbedBuilder().setColor('#ED4245').setTitle('test').setTimestamp().setFooter({ text: interaction.member.user.username });

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
                        .addFields([{ name: `__Avertissement numéro__`, value: `**Raison :** ${warn1R} \nLe *${wDate1}* ~ Par *${wDate2}* ` }])
                ],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setLabel('Supprimer un avertissement').setStyle(ButtonStyle.Danger).setCustomId(`WarnDel, ${userId}, ${user}`)
                    )
                ],
                ephemeral: true
            });
        if (warnNbr == 2)
            interaction.reply({
                embeds: [
                    response.setTitle(':card_box: Liste des avertissements\n').addFields([
                        { name: `__Avertissement numéro__`, value: `**Raison :** ${warn1R} \nLe *${wDate1}* ~ Par *${wAuthor1}* ` },
                        { name: `__Avertissement numéro__`, value: `**Raison :** ${warn2R}\nLe *${wDate2}* ~ Par *${wAuthor2}* ` }
                    ])
                ],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setLabel('Supprimer un avertissement').setStyle(ButtonStyle.Danger).setCustomId(`WarnDel, ${userId}, ${user}`)
                    )
                ],
                ephemeral: true
            });

        interaction.guild.channels.cache.get(log).send({
            embeds: [logs.setTitle('Information sur les vaertissements').setDescription(`Les avertissements de ${user} on étaient listés.`)]
        });
    }
};
