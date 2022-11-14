//AddWarn
const { Interaction } = require('discord.js');
const { logs, response } = require('../../utils/embed');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'addWarn',
    async execute(client, interaction) {
        const dataUpdate = {
            numberWarn: 3,
            warn3_author: `${interaction.user.username}`,
            warn3_date: `${d.toLocaleString()}`,
            warn3_reason: `${reason}`
        };
        await warn.update(dataUpdate);

        response(interaction, `✅ ${user} **a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 3**`);

        logs(interaction, 'Avertissement', `${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 3eme warn`);

        interaction.guild.members.ban(userId, {
            reason: 'Cet utilisateur a totalisé 3 warn, conformément au règlement il a été ban (ces warns sont consultables via son id discord)'
        });
    }
};
