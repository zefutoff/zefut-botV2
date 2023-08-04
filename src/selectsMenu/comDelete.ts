import { SelectMenu } from '../clientdata';
import { error } from '../utils/embed';

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

        const comDb = db.collection('comment').doc(userId);
        const doc = await comDb.get();

        if (!doc.exists) {
            error(
                interaction,
                `${user} n'est pas présent dans la base de donné, consulte les logs afin de voir si un autre modérateur n'a pas déjà supprimés ces warn.`
            );
            return;
        }

        const com = doc.data().comment;

        const comNbr = com.length;
    }
};
