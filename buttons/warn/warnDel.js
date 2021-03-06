const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { log } = require('../../utils/channels.json');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'WarnDel',
    async execute(client, interaction) {
        const response = new MessageEmbed().setColor('GREEN');
        const logs = new MessageEmbed().setColor('RED').setTitle('').setTimestamp().setFooter({ text: interaction.member.user.username });

        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        const warn = db.collection('warn').doc(userId);
        const doc = await warn.get();

        const warn1R = doc._fieldsProto.warn1_reason.stringValue;
        const warn2R = doc._fieldsProto.warn2_reason.stringValue;

        interaction.reply({
            embeds: [response.setTitle('Choisir un avertissement √† supprimer')],
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId(`WarnChooseDelete, ${userId}, ${user}`)
                        .setPlaceholder('Aucun avertissement selectionn√©')
                        .addOptions([
                            {
                                label: 'Avertissement 1',
                                description: `${warn1R}`,
                                value: 'first_warn'
                            },
                            {
                                label: 'Avertissement 2',
                                description: `${warn2R.substring(0, 50)}`,
                                value: 'seconde_warn'
                            }
                        ])
                )
            ],
            ephemeral: true
        });
    }
};
