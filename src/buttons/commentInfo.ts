import { ButtonBuilder, ButtonStyle, ActionRowBuilder, User } from 'discord.js';
import { Buttons } from '../clientdata';
import { rspComponents, response } from '../utils/embed';

const admin = require('firebase-admin');
let db = admin.firestore();

export const button: Buttons = {
    name: 'CommentInfo',
    execute: async interaction => {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = data[2];

        // Récupération des commentaires de l'utilisateur
        const comDb = db.collection('comment').doc(userId);
        const doc = await comDb.get();

        // Si l'utilisateur n'existe pas dans la base de données, afficher un message d'erreur et quitter la fonction
        if (!doc.exists) {
            await response(
                interaction,
                `${user} n'est pas présent dans la base de données, consultez les logs pour voir si un autre modérateur n'a pas déjà supprimé ses commentaires.`
            );
            return;
        }

        const com = doc.data().comment;

        const comNbr = com.length;

        let text = '';

        // Parcours de chaque commentaire et formatage de leur affichage
        for (let i = 0; i < comNbr; i++) {
            const commentArray = com[i];
            const comment = commentArray[0];
            const date = commentArray[1].toDate().toLocaleDateString();
            const author = commentArray[2];
            text += `__Commentaire numéro__ ${i}\n **Commentaire :** ${comment} \nLe *${date}* ~ Par *${author}*\n\n`;
        }

        // Affichage de la liste des commentaires avec un bouton pour supprimer un commentaire
        await rspComponents(
            interaction,
            ':card_box: Liste des commentaires\n',
            text,
            new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setLabel('Supprimer un commentaire')
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId(`ComDel, ${userId}, ${user}`) //Faire le select Menu du suppresion
            )
        );
    }
};
