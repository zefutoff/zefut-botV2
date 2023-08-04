import { SelectMenu } from '../clientdata';

const {} = require('discord.js');
const { logs, response } = require('../utils/embed');

const admin = require('firebase-admin');
let db = admin.firestore();

export const selectMenu: SelectMenu = {
    name: 'WarnChooseDelete',
    async execute(interaction) {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        const warn = db.collection('warn').doc(userId);
        const doc = await warn.get();
        const warnNbr = doc._fieldsProto.numberWarn.integerValue;

        if (interaction.values.includes('first_warn')) {
            if (warnNbr == 1) {
                await db.collection('warn').doc(userId).delete();

                response(interaction, `✅ Le warn de ${user} à était supprimé.`);

                logs(interaction, 'Avertissement supprimé', `L'avertissement de ${user} à était supprimés.`);
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

                response(interaction, `✅ Le warn de ${user} à était supprimé.`);

                logs(interaction, 'Avertissement supprimé', `L'avertissement de ${user} à était supprimés.`);
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

                response(interaction, `✅ L'avrtissement de ${user} à était supprimé.`);

                logs(interaction, 'Avertissement supprimé', `L'avertissement de ${user} à était supprimés.`);
            }

            if (warnNbr < 2) {
                response(interaction, `✅ ${user} ne totalise pas 2 avertissement.`);
            }
        }
    }
};
