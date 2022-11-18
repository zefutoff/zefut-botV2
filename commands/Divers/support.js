const { CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { logs, rspComponents } = require('../../utils/embed');
const { twitch, epic, insta, utip } = require('../../utils/emoji.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('soutenir')
        .setDescription('Tu obtiendras des liens vers tous les endroits ou tu peux retrouver/aider Zefut !'),
    async execute(interaction) {
        rspComponents(
            interaction,
            'Deviens une superbe personne !',
            'Grace à tous ces magnifiques boutons tu peux soutenir zefut de pleins de manière différentes !\n \n **CODE CREATEUR** : *ZEFUT*',
            new ActionRowBuilder().addComponents(
                new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://store.epicgames.com/fr/').setEmoji(epic),
                new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://www.twitch.tv/zefut').setEmoji(twitch),
                new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://www.instagram.com/zefutoff/').setEmoji(insta),
                new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://utip.io/zefut').setEmoji(utip)
            )
        );

        logs(interaction, 'Soutenir', 'La commande a été exécutée avec succès !');
    }
};
