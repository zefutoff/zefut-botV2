const {
    PermissionsBitField,
    CommandInteraction,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    SlashCommandBuilder
} = require('discord.js');
const { permError, error, response, rspComponents, logs } = require('../../utils/embed');
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

    async execute(interaction) {
        const { options } = interaction;

        const user = options.getMember('user');
        const reason = options.getString('reason');

        const warn = db.collection('warn').doc(user.id);
        const doc = await warn.get();

        const d = new Date();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return permError(interaction);
        }

        if (
            user.permissions.has(PermissionsBitField.Flags.BanMembers) &&
            !interaction.member.PermissionsBitField.has(PermissionsBitField.Flags.Administrator)
        ) {
            return error(interaction, `❌ Tu ne peux pas warn ${user}`);
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

            response(interaction, `✅ **${user} a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 1**`);

            logs(
                interaction,
                'Utilisateur averti',
                `${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 1er warn`
            );
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

                response(interaction, `✅ **${user} a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 2**`);

                logs(
                    interaction,
                    'Utilisateur averti',
                    `${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 2eme warn`
                );
            }

            if (warn_number === '2') {
                rspComponents(
                    interaction,
                    `${user} comptabilise dejà 2 warn ce qui veut dire qu'il va être bannis, confirme tu la sanction ? `,
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setLabel('CONFIRMER')
                            .setStyle(ButtonStyle.Success)
                            .setCustomId(`AddWarn, ${user.id}, ${user}, ${reason}`),
                        new ButtonBuilder().setLabel('ANNULER').setStyle(ButtonStyle.Danger).setCustomId('False')
                    )
                );
            }
        }
    }
};
