const { MessageEmbed, MessageButton, GuildMember, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { log } = require('../../utils/channels.json');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'interactionCreate',
    /**
     *
     * @param {MessageSelectMenu} interaction
     * @returns
     */
    async execute(interaction) {
        const response = new MessageEmbed().setColor('GREEN');
        const error = new MessageEmbed().setColor('RED');
        const logs = new MessageEmbed().setColor('RED').setTitle('').setTimestamp().setFooter({ text: interaction.member.user.username });

        const d = new Date();

        if (!interaction.isButton() & !interaction.isSelectMenu()) return;

        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];
        const reason = data[3];

        console.log(userId);

        const warn = db.collection('warn').doc(userId);
        const doc = await warn.get();

        const warn1R = doc._fieldsProto.warn1_reason.stringValue;
        const warn2R = doc._fieldsProto.warn2_reason.stringValue;

        if (doc.exists) {
            warnNbr = doc._fieldsProto.numberWarn.integerValue;
        }

        if (interaction.customId.includes('False')) {
            interaction.reply({ embeds: [error.setDescription(`❌ Le warn à était annulé.`)], ephemeral: true });
            //Faire en sorte que les boutons se grise
        }

        if (interaction.customId.includes('True')) {
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

        if (interaction.customId.includes('WarnInfo')) {
            if (warnNbr == 1)
                interaction.reply({
                    embeds: [
                        response
                            .setTitle(':card_box: Liste des avertissements\n')
                            .addField(
                                `__Avertissement numéro__`,
                                `**Raison :** ${warn1R} \nLe *${doc._fieldsProto.warn1_date.stringValue}* ~ Par *${doc._fieldsProto.warn1_author.stringValue}* `
                            )
                    ],
                    components: [
                        new MessageActionRow().addComponents(
                            new MessageButton().setLabel('Supprimer un avertissement').setStyle('DANGER').setCustomId(`WarnDel, ${userId}, ${user}`)
                        )
                    ],
                    ephemeral: true
                });
            if (warnNbr == 2)
                interaction.reply({
                    embeds: [
                        response
                            .setTitle(':card_box: Liste des avertissements\n')
                            .addField(
                                `__Avertissement numéro__`,
                                `**Raison :** ${warn1R} \nLe *${doc._fieldsProto.warn1_date.stringValue}* ~ Par *${doc._fieldsProto.warn1_author.stringValue}* `
                            )
                            .addField(
                                `__Avertissement numéro__`,
                                `**Raison :** ${warn2R}\nLe *${doc._fieldsProto.warn2_date.stringValue}* ~ Par *${doc._fieldsProto.warn2_author.stringValue}* `
                            )
                    ],
                    components: [
                        new MessageActionRow().addComponents(
                            new MessageButton().setLabel('Supprimer un avertissement').setStyle('DANGER').setCustomId(`WarnDel, ${userId}, ${user}`)
                        )
                    ],
                    ephemeral: true
                });

            interaction.guild.channels.cache.get(log).send({
                embeds: [logs.setTitle('Information sur les vaertissements').setDescription(`Les avertissements de ${user} on étaient listés.`)]
            });
        }

        if (interaction.customId.includes('WarnDel')) {
            interaction.reply({
                embeds: [response.setTitle('Choisir un avertissement à supprimer')],
                components: [
                    new MessageActionRow().addComponents(
                        new MessageSelectMenu()
                            .setCustomId(`WarnChooseDelete, ${userId}, ${user}`)
                            .setPlaceholder('Aucun avertissement selectionné')
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

        if (interaction.customId.includes('WarnChooseDelete')) {
            if (interaction.values.includes('first_warn')) {
                if (warnNbr == 1) {
                    await db.collection('warn').doc(userId).delete();
                    interaction.reply({
                        embeds: [response.setDescription(`✅ Le warn de ${user} à était supprimé.`)],
                        ephemeral: true
                    });

                    interaction.guild.channels.cache.get(log).send({
                        embeds: [logs.setTitle('Avertissement supprimé').setDescription(`L'avertissement de ${user} à était supprimés.`)]
                    });
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

                    interaction.reply({
                        embeds: [response.setDescription(`✅ Le warn de ${user} à était supprimé.`)],
                        ephemeral: true
                    });

                    interaction.guild.channels.cache.get(log).send({
                        embeds: [logs.setTitle('Avertissement supprimé').setDescription(`L'avertissement de ${user} à était supprimés.`)]
                    });
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

                    interaction.reply({
                        embeds: [response.setDescription(`✅ L'avrtissement de ${user} à était supprimé.`)],
                        ephemeral: true
                    });

                    interaction.guild.channels.cache.get(log).send({
                        embeds: [logs.setTitle('Avertissement supprimé').setDescription(`L'avertissement de ${user} à était supprimés.`)]
                    });
                }

                if (warnNbr < 2) {
                    interaction.reply({
                        embeds: [error.setDescription(`✅ ${user} ne totalise pas 2 avertisseme,t.`)],
                        ephemeral: true
                    });
                }
            }
        }
    }
};
