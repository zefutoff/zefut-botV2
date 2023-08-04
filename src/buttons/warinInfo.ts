import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import { Buttons } from '../clientdata';
import { rspComponents, logs, error } from '../utils/embed';

import admin from 'firebase-admin';
const db = admin.firestore();

export const button: Buttons = {
    name: 'WarnInfo',
    execute: async interaction => {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        const warn = db.collection('warn').doc(userId);
        const doc = await warn.get();

        if (!doc.exists) {
            error(
                interaction,
                `${user} n'est pas présent dans la base de données, consultez les logs afin de voir si un autre modérateur n'a pas déjà supprimé ses avertissements.`
            );
            return;
        }

        const warnNbr = doc.get('numberWarn');

        let text = '';

        for (let i = 1; i <= warnNbr; i++) {
            const reason = doc.get(`warn${i}_reason`);
            const date = doc.get(`warn${i}_date`);
            const author = doc.get(`warn${i}_author`);
            text += `__Avertissement numéro__ ${i}\n **Raison :** ${reason} \nLe *${date}* ~ Par *${author}*\n\n`;
        }

        rspComponents(
            interaction,
            ':card_box: Liste des avertissements\n',
            text,
            new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setLabel('Supprimer un avertissement')
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId(`WarnDel, ${userId}, ${user}`)
            )
        );

        logs(interaction, 'Information sur les avertissements', `Les avertissements de ${user} ont été listés.`);
    }
};
