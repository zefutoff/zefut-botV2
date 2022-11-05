const { PermissionsBitField, EmbedBuilder, CommandInteraction, ButtonBuilder, ActionRowBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { log } = require('../../utils/channels.json');

const admin = require('firebase-admin');
let db = admin.firestore();

//TODO :
//  - On peut se warn soit même

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription("Permet d'ajouter un avertissement à un utilisateur")
        .addUserOption(option => option.setName('user').setDescription('Utilisateur à avertir').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription("Description de l'avertissement").setRequired(true)),

    /**
     * @param {CommandInteraction} interaction
     * @returns
     */

    async execute(interaction) {
        const { options } = interaction;

        const user = options.getMember('user');
        const reason = options.getString('reason');

        const logs = new EmbedBuilder().setColor('#ED4245').setTitle('Utilisateur averti').setTimestamp().setFooter({ text: interaction.member.user.username });
        const response = new EmbedBuilder().setColor('#57F287');
        const error = new EmbedBuilder().setColor('#ED4245');

        const warn = db.collection('warn').doc(user.id);
        const doc = await warn.get();

        const d = new Date();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({
                embeds: [error.setDescription(`❌ Tu n'as pas les PermissionsBitField requises pour utiliser cette commande !`)],
                ephemeral: true
            });
        }

        if (user.permissions.has(PermissionsBitField.Flags.BanMembers) && !interaction.member.PermissionsBitField.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ embeds: [error.setDescription(`❌ Tu ne peux pas warn ${user}`)], ephemeral: true });
        }

        if (!doc.exists) {
            const data = {
                name: `${user.user.username}`,
                numberWarn: 1,
                warn1_author: `${interaction.user.username}`,
                warn1_date: `${d.toLocaleString()}`,
                warn1_reason: `${reason}`,
                warn2_author: ``,
                warn2_date: ``,
                warn2_reason: ``,
                warn3_author: ``,
                warn3_date: ``,
                warn3_reason: ``
            };
            warn.set(data);

            interaction.reply({
                embeds: [response.setDescription(`✅ **${user} a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 1**`)],
                ephemeral: true
            });

            interaction.guild.channels.cache.get(log).send({
                embeds: [logs.setDescription(`${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 1er warn`)]
            });
        } else {
            const warn_number = doc._fieldsProto.numberWarn.integerValue;

            if (warn_number === '1') {
                const dataUpdate = {
                    numberWarn: 2,
                    warn2_author: `${interaction.user.username}`,
                    warn2_date: `${d.toLocaleString()}`,
                    warn2_reason: `${reason}`
                };
                warn.update(dataUpdate);

                interaction.reply({
                    embeds: [response.setDescription(`✅ **${user} a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 2**`)],
                    ephemeral: true
                });

                interaction.guild.channels.cache.get(log).send({
                    embeds: [logs.setDescription(`${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 2eme warn`)]
                });
            }

            if (warn_number === '2') {
                interaction.reply({
                    embeds: [
                        response.setDescription(`${user} comptabilise dejà 2 warn ce qui veut dire qu'il va être bannis, confirme tu la sanction ? `).setColor('ORANGE')
                    ],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setLabel('CONFIRMER').setStyle('SUCCESS').setCustomId(`AddWarn, ${user.id}, ${user}, ${reason}`),
                            new ButtonBuilder().setLabel('ANNULER').setStyle(ButtonStyle.Danger).setCustomId('False')
                        )
                    ],
                    ephemeral: true
                });
            }
        }
    }
};
