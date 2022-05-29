const { MessageEmbed } = require('discord.js');
const { log } = require('../../utils/channels.json');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'WarnChooseDelete',
    async execute(client, interaction) {
        const response = new MessageEmbed().setColor('GREEN');
        const logs = new MessageEmbed().setColor('RED').setTitle('').setTimestamp().setFooter({ text: interaction.member.user.username });

        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        const warn = db.collection('warn').doc(userId);
        const doc = await warn.get();
        const warnNbr = doc._fieldsProto.numberWarn.integerValue;

        if (interaction.values.includes('first_warn')) {
            if (warnNbr == 1) {
                await db.collection('warn').doc(userId).delete();
                interaction.reply({
                    embeds: [response.setDescription(`✅ Le warn de ${user} à était supprimé.`)],
                    ephemeral: true
                });

                interaction.guild.channels.cache.get(log).send({
                    embeds: [logs.setTitle('Avertissement supprimé').setDescription(`L'avertissement de ${user} à était supprimés.`)]
                });
            }

            if (warnNbr == 2) {
                const dataUpdate = {
                    numberWarn: 1,
                    warn1_author: `${doc._fieldsProto.warn2_author.stringValue}`,
                    warn1_date: `${doc._fieldsProto.warn2_date.stringValue}`,
                    warn1_reason: `${doc._fieldsProto.warn2_reason.stringValue}`,
                    warn2_author: ``,
                    warn2_date: ``,
                    warn2_reason: ``
                };
                warn.update(dataUpdate);

                interaction.reply({
                    embeds: [response.setDescription(`✅ Le warn de ${user} à était supprimé.`)],
                    ephemeral: true
                });

                interaction.guild.channels.cache.get(log).send({
                    embeds: [logs.setTitle('Avertissement supprimé').setDescription(`L'avertissement de ${user} à était supprimés.`)]
                });
            }
        }
        if (interaction.values.includes('seconde_warn')) {
            if (warnNbr == 2) {
                const dataUpdate = {
                    numberWarn: 1,
                    warn2_author: ``,
                    warn2_date: ``,
                    warn2_reason: ``
                };
                warn.update(dataUpdate);

                interaction.reply({
                    embeds: [response.setDescription(`✅ L'avrtissement de ${user} à était supprimé.`)],
                    ephemeral: true
                });

                interaction.guild.channels.cache.get(log).send({
                    embeds: [logs.setTitle('Avertissement supprimé').setDescription(`L'avertissement de ${user} à était supprimés.`)]
                });
            }

            if (warnNbr < 2) {
                interaction.reply({
                    embeds: [error.setDescription(`✅ ${user} ne totalise pas 2 avertisseme,t.`)],
                    ephemeral: true
                });
            }
        }
    }
};
