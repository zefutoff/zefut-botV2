const { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { log } = require('../../utils/channels.json');
const { twitch, epic, insta, utip, site } = require('../../utils/emoji.json');

module.exports = {
    data: new SlashCommandBuilder().setName('soutenir').setDescription('Tu obtiendras des liens vers tous les endroits ou tu peux retrouver/aider Zefut !'),
    async execute(interaction) {
        const logs = new EmbedBuilder().setTitle('/Soutenir').setTimestamp().setFooter({ text: interaction.member.user.username });
        const response = new EmbedBuilder()
            .setColor('#57F287')
            .setTitle('Deviens une superbe personne !')
            .setDescription('Grace à tous ces magnifiques boutons tu peux soutenir zefut de pleins de manière différentes !\n \n **CODE CREATEUR** : *ZEFUT*');

        interaction.reply({
            embeds: [response],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://store.epicgames.com/fr/').setEmoji(interaction.guild.emojis.cache.get(epic))
                    // new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://www.twitch.tv/zefut').setEmoji(interaction.guild.emojis.cache.get(twitch)),
                    // new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://www.instagram.com/zefutoff/').setEmoji(interaction.guild.emojis.cache.get(insta)),
                    // new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://www.zefut.fr').setEmoji(interaction.guild.emojis.cache.get(site)),
                    // new ButtonBuilder().setStyle(ButtonStyle.Link).setURL('https://utip.io/zefut').setEmoji(interaction.guild.emojis.cache.get(utip))
                )
            ]
        });

        return interaction.guild.channels.cache.get(log).send({ embeds: [logs.setDescription(`La commande a été exécutée avec succès !`)] });
    }
};
