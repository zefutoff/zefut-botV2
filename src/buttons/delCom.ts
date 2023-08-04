import { Buttons, Comment } from '../clientdata';

//Faire les logs
import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { logs, rspComponents, response } from '../utils/embed';

import admin from 'firebase-admin';
const db = admin.firestore();

export const button: Buttons = {
    name: 'CommentDel',
    execute: async interaction => {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        const comments = db.collection('comments').doc(userId);
        const doc = await comments.get();

        const commentsArray = doc.get('comments');
        if (!commentsArray || commentsArray.length === 0) {
            response(interaction, `${user} n'a pas de commentaire à supprimer.`);
            return;
        }

        const selectOptions = commentsArray.map((comment: Comment, index: number) => {
            return {
                label: `Commentaire ${index + 1}`,
                description: `Auteur: ${comment.author}, Date: ${comment.date}`,
                value: `comment_${index}`
            };
        });

        rspComponents(
            interaction,
            'Choisissez un commentaire à supprimer',
            ' ',
            new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`CommentChooseDelete, ${userId}, ${user}`)
                    .setPlaceholder('Aucun commentaire sélectionné')
                    .addOptions(selectOptions)
            )
        );
    }
};
