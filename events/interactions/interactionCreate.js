const { MessageEmbed, MessageButton } = require('discord.js');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'interactionCreate',
    /**
     *
     * @param {MessageButton} interaction
     */
    async execute(interaction) {
        const response = new MessageEmbed().setColor('GREEN');
        const error = new MessageEmbed().setColor('RED');

        const d = new Date();

        if (!interaction.isButton()) return;

        if (interaction.customId.includes('False')) {
            interaction.reply({ embeds: [error.setDescription(`❌ Le warn à était annulé.`)], ephemeral: true });
            //Faire en sorte que les bouton se grise
        }

        if (interaction.customId.includes('True')) {
            const data = interaction.customId.split(', ');
            const userId = data[1];

            const warn = db.collection('warn').doc(userId);

            const dataUpdate = {
                numberWarn: 3,
                warn3_author: `${interaction.user.username}`,
                warn3_date: `${d.toLocaleString()}`,
                warn3_reason: `${data[3]}`
            };
            warn.update(dataUpdate);

            interaction.reply({
                embeds: [response.setDescription(`✅ ${data[2]} **a été warn pour la raison suivante** : ${data[3]} \n **Nombre de warn : 3**`)],
                ephemeral: true
            });

            interaction.guild.channels.cache.get(log).send({
                embeds: [logs.setDescription(`${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 3eme warn`)]
            });

            user.ban({ reason: 'Cet utilisateur a totalisé 3 warn, conformément au règlement il a été ban (ces bans sont consultables via son id discord)**' });
        }
    }
};
