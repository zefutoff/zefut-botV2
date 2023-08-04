//A revoir prcq les commentaire
import {
    PermissionsBitField,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
    GuildMember,
    APIInteractionDataResolvedGuildMember
} from 'discord.js';
import { logs, rspInfo, rspInfoComp } from '../utils/embed';
import moment from 'moment/moment';
import { SlashCommand } from '../clientdata';

const admin = require('firebase-admin');

let db = admin.firestore();

const isGuildMember = (obj: GuildMember | APIInteractionDataResolvedGuildMember | null): obj is GuildMember => {
    return obj !== null && 'id' in obj;
};

export const command: SlashCommand = {
    name: 'info',
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription("Permet d'obtenir des informations sur un utilisateur")
        .addUserOption(option =>
            option.setName('user').setDescription("Utilisateur concerné par la demande d'information").setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),

    execute: async interaction => {
        const { options } = interaction;

        const User = options.getMember('user');

        if (!isGuildMember(User)) {
            return;
            //a faire
        }

        const warn = await db.collection('warn').doc(User.id).get();
        const com = await db.collection('comment').doc(User.id).get();

        var warnNbr = 0;
        var comNbr = 0;

        if (warn.exists) warnNbr = warn.data().numberWarn;
        if (com.exists) comNbr = com.data().comment.length;

        logs(interaction, 'info', 'La commande info à était utilisé');

        if (warnNbr === 0 && comNbr === 0) {
            rspInfo(
                interaction,
                `:file_folder: ${User?.user.username}\n **Nom Complet :** ${User?.user.tag}\n **Surnom :** ${
                    User?.nickname === null ? 'Aucun' : User?.nickname
                }\n  **Id :** ${User?.id}\n **Compte Crée le** ${moment(User?.user.createdAt).format(
                    'DD/MM/YYYY | HH:mm'
                )}\n **Présent sur le serveur depuis le** ${moment(User?.joinedAt).format('DD/MM/YYYY | HH:mm')}\n
                **Nombre d'infraction(s) :** ${warnNbr}\n
                **Nombre de commentaire(s) :** ${comNbr}`,
                User
            );
        } else {
            rspInfoComp(
                interaction,
                `Voici les informations concernant ${User?.user.username} :`,
                `:file_folder: ${User?.user.username}\n **Nom Complet :** ${User?.user.tag}\n **Surnom :** ${
                    User?.nickname === null ? 'Aucun' : User?.nickname
                }\n 
                 **Id :** ${User.id}\n **Compte Crée le** ${moment(User?.user.createdAt).format(
                    'DD/MM/YYYY | HH:mm'
                )}\n **Présent sur le serveur depuis le** ${moment(User?.joinedAt).format('DD/MM/YYYY | HH:mm')}\n
                **Nombre d'infraction(s) :** ${warnNbr}\n
                **Nombre de commentaire(s) :** ${comNbr}`,
                User?.displayAvatarURL(),
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                        .setLabel('Voir les avertissements')
                        .setStyle(ButtonStyle.Primary)
                        .setCustomId(`WarnInfo, ${User.id}, ${User}`),
                    new ButtonBuilder()
                        .setLabel('Voir les commentaires')
                        .setStyle(ButtonStyle.Primary)
                        .setCustomId(`CommentInfo, ${User.id}, ${User}`)
                )
            );
        }
    }
};
