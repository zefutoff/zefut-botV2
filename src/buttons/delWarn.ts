import { Buttons } from '../clientdata';

//Faire les logs
import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { logs, rspComponents, response } from '../utils/embed';

import admin from 'firebase-admin';
const db = admin.firestore();

export const button: Buttons = {
    name: 'WarnDel',
    execute: async interaction => {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        const warn = db.collection('warn').doc(userId);
        const doc = await warn.get();

        const warnNbr = doc.get('numberWarn');
        if (!warnNbr) {
            response(interaction, `${user} n'a pas d'avertissement à supprimer.`);
            return;
        }

        if (warnNbr === 1) {
            await db.collection('warn').doc(userId).delete();
            response(interaction, `✅ Le warn de ${user} a été supprimé.`);
            logs(interaction, 'Avertissement supprimé', `L'avertissement de ${user} a été supprimé.`);
        } else if (warnNbr === 2) {
            const warn1Reason = doc.get('warn1_reason');
            const warn2Reason = doc.get('warn2_reason');
            rspComponents(
                interaction,
                'Choisissez un avertissement à supprimer',
                ' ',
                new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId(`WarnChooseDelete, ${userId}, ${user}`)
                        .setPlaceholder('Aucun avertissement sélectionné')
                        .addOptions([
                            {
                                label: 'Avertissement 1',
                                description: `${warn1Reason}`,
                                value: 'first_warn'
                            },
                            {
                                label: 'Avertissement 2',
                                description: `${warn2Reason.substring(0, 50) || 'Aucun'}`,
                                value: 'second_warn'
                            }
                        ])
                )
            );
        }
    }
};
