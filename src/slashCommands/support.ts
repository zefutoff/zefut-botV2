import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../clientdata';
import { logs, rspComponents } from '../utils/embed';
import { twitch, insta, utip, youtube } from '../utils/emoji.json';

export const command: SlashCommand = {
    name: 'soutenir',
    data: new SlashCommandBuilder()
        .setName('soutenir')
        .setDescription('Tu obtiendras des liens vers tous les endroits ou tu peux retrouver/aider Zefut !'),

    execute: async interaction => {
        rspComponents(
            interaction,
            'Deviens une superbe personne !',
            'Grace à tous ces magnifiques boutons tu peux soutenir zefut de pleins de manière différentes !',
            new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://www.youtube.com/@zefut').setEmoji(youtube),
                new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://www.twitch.tv/zefut').setEmoji(twitch),
                new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://www.instagram.com/zefutoff/').setEmoji(insta)
            )
        );

        logs(interaction, 'Soutenir', 'La commande a été exécutée avec succès !');
    }
};
