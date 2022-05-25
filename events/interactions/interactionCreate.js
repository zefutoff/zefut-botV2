const { MessageEmbed, MessageButton, GuildMember } = require('discord.js');
const { log } = require('../../utils/channels.json');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'interactionCreate',
    /**
     *
     * @param {GuildMember} interaction
     * @returns
     */
    async execute(interaction) {
        const response = new MessageEmbed().setColor('GREEN');
        const error = new MessageEmbed().setColor('RED');
        const logs = new MessageEmbed().setColor('RED').setTitle('Message clear').setTimestamp().setFooter({ text: interaction.member.user.username });

        const d = new Date();

        if (!interaction.isButton()) return;

        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];
        const reason = data[3];

        if (interaction.customId.includes('False')) {
            interaction.reply({ embeds: [error.setDescription(`❌ Le warn à était annulé.`)], ephemeral: true });
            //Faire en sorte que les bouton se grise
        }

        if (interaction.customId.includes('True')) {
            const warn = db.collection('warn').doc(userId);

            console.log(interaction.customId);

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
                embeds: [logs.setDescription(`${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 3eme warn`)]
            });

            interaction.guild.members.ban(userId, {
                reason: 'Cet utilisateur a totalisé 3 warn, conformément au règlement il a été ban (ces warns sont consultables via son id discord)'
            });
        }
    }
};
