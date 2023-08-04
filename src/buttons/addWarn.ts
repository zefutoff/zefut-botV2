import { logs, response } from '../utils/embed';

import admin from 'firebase-admin';
import { Buttons } from '../clientdata';

let db = admin.firestore();

export const button: Buttons = {
    name: 'AddWarn',
    execute: async interaction => {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];
        const reason = data[3];

        const d = new Date();

        const warn = db.collection('warn').doc(userId);

        const dataUpdate = {
            numberWarn: 3,
            warn3_author: `${interaction.user.username}`,
            warn3_date: `${d.toLocaleString()}`,
            warn3_reason: `${reason}`
        };

        await warn.update(dataUpdate);

        response(interaction, `✅ ${user} **a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 3**`);

        logs(interaction, 'Avertissement', `${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 3eme warn`);

        interaction.guild?.members.ban(userId, {
            reason: 'Cet utilisateur a totalisé 3 warn, conformément au règlement il a été ban (ces warns sont consultables via son id discord)'
        });
    }
};
