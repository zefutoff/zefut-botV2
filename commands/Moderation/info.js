const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { permError, logs, rspInfo, rspInfoComp } = require('../../utils/embed');
const moment = require('moment/moment');

const admin = require('firebase-admin');

let db = admin.firestore();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription("Permet d'obtenir des informations sur un utilisateur")
        .addUserOption(option =>
            option.setName('user').setDescription("Utilisateur concerné par la demande d'information").setRequired(true)
        ),

    async execute(interaction) {
        const { options } = interaction;

        const User = options.getMember('user');

        const warn = db.collection('warn').doc(User.id);
        const doc = await warn.get();

        var warnNbr = 0;

        if (doc.exists) warnNbr = doc._fieldsProto.numberWarn.integerValue;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return permError(interaction);

        if (warnNbr === 0)
            return rspInfo(
                interaction,
                `:file_folder: ${User.user.username}\n **Nom Complet :** ${User.user.tag}\n **Surnom :** ${
                    User.nickname === null ? 'Aucun' : User.nickname
                }\n  **Id :** ${User.id}\n **Compte Crée le** ${moment(User.user.createdAt).format(
                    'DD/MM/YYYY | HH:mm'
                )}\n **Présent sur le serveur depuis le** ${moment(User.joinedAt).format('DD/MM/YYYY | HH:mm')}\n
                **Nombre d'infraction(s) :** ${warnNbr}`,
                User
            );

        rspInfoComp(
            interaction,
            `Voici les informations concernant ${User.user.username} :`,
            `:file_folder: ${User.user.username}\n **Nom Complet :** ${User.user.tag}\n **Surnom :** ${
                User.nickname === null ? 'Aucun' : User.nickname
            }\n 
                 **Id :** ${User.id}\n **Compte Crée le** ${moment(User.user.createdAt).format(
                'DD/MM/YYYY | HH:mm'
            )}\n **Présent sur le serveur depuis le** ${moment(User.joinedAt).format('DD/MM/YYYY | HH:mm')}\n
                **Nombre d'infraction(s) :** ${warnNbr}`,
            User.displayAvatarURL(),
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('Voir les avertissements')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`WarnInfo, ${User.id}, ${User}`)
            )
        );

        return logs(interaction);
    }
};
