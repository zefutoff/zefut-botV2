//AddWarn
const { Interaction } = require('discord.js');
const { log } = require('../../utils/channels.json');

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

        interaction.reply({
            embeds: [response.setDescription(`✅ ${user} **a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 3**`)],
            ephemeral: true
        });

        interaction.guild.channels.cache.get(log).send({
            embeds: [logs.setTitle('Warn').setDescription(`${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 3eme warn`)]
        });

        interaction.guild.members.ban(userId, {
            reason: 'Cet utilisateur a totalisé 3 warn, conformément au règlement il a été ban (ces warns sont consultables via son id discord)'
        });
    }
};
