//Faire les logs
const { ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const { logs, response, rspComponents } = require('../../utils/embed');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'WarnDel',
    async execute(client, interaction) {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        const warn = db.collection('warn').doc(userId);
        const doc = await warn.get();

        const warn1R = doc._fieldsProto.warn1_reason.stringValue;
        const warn2R = doc._fieldsProto.warn2_reason.stringValue;

        const warnNbr = doc._fieldsProto.numberWarn.integerValue;

        if (warnNbr == 1) {
            await db.collection('warn').doc(userId).delete();
            response(interaction, `✅ Le warn de ${user} à était supprimé.`);

            return logs(interaction, 'Avertissement supprimé', `L'avertissement de ${user} à était supprimés.`);
        }

        if (warnNbr == 2) {
            rspComponents(
                interaction,
                'Choisir un avertissement à supprimer',
                ' ',
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                        .setCustomId(`WarnChooseDelete, ${userId}, ${user}`)
                        .setPlaceholder('Aucun avertissement selectionné')
                        .addOptions([
                            {
                                label: 'Avertissement 1',
                                description: `${warn1R}`,
                                value: 'first_warn'
                            },
                            {
                                label: 'Avertissement 2',
                                description: `${warn2R.substring(0, 50) || 'Aucun'}`,
                                value: 'seconde_warn'
                            }
                        ])
                )
            );
        }
    }
};
