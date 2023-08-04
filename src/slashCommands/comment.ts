import { APIInteractionDataResolvedGuildMember, GuildMember, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../clientdata';
import { error, logs, response } from '../utils/embed';

import { firestore } from 'firebase-admin';
const admin = require('firebase-admin');
let db = admin.firestore();

const isGuildMember = (obj: GuildMember | APIInteractionDataResolvedGuildMember | null): obj is GuildMember => {
    return obj !== null && 'id' in obj;
};

export const command: SlashCommand = {
    name: 'commentaire',

    data: new SlashCommandBuilder()
        .setName('commentaire')
        .setDescription('Ajouter un commentaire sur un utilisateur visible par la modération.')
        .addUserOption(option => option.setName('utilisateur').setDescription('Utilisateur conercné par le commentaire').setRequired(true))
        .addStringOption(option => option.setName('commentaire').setDescription('Commentaire visible par les modérateur').setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),

    execute: async interaction => {
        const { options, member } = interaction;

        const user = options.getMember('utilisateur');
        const comment = options.getString('commentaire');

        if (comment === null) {
            error(interaction, `❌ Tu n'a pas spécifié de commentaire !`);
            return;
        }

        if (!isGuildMember(user)) {
            error(interaction, `❌  Tu n'a pas spécifié d'utilisateur !`);
            return;
        }

        const comDb = db.collection('comment').doc(user.id);
        const doc = await comDb.get();

        if (
            member !== null &&
            typeof member.permissions != 'string' &&
            user.permissions.has(PermissionsBitField.Flags.ManageMessages) &&
            !member.permissions.has(PermissionsBitField.Flags.Administrator)
        ) {
            error(interaction, `❌ Tu ne peux pas ajouter de commentaire à cet ${user}`);
            return;
        }

        if (!doc.exists) {
            comDb.set({ comment: [{ 0: comment, 1: firestore.Timestamp.now(), 2: interaction.user.username }] });
        } else {
            comDb.update({
                comment: firestore.FieldValue.arrayUnion({ 0: comment, 1: firestore.Timestamp.now(), 2: interaction.user.username })
            });
        }

        response(interaction, `✅ **Le commentaire suivant à était ajouté à l'utilisateur ${user}** : *${comment}*`);

        logs(interaction, 'Commentaire ajouté', `${member} **a ajouté le commentaire suivant à l'utilisateur ${user}** : ${comment}`);
    }
};
