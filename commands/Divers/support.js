const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { log } = require('../../utils/channels.json');
const { twitch, epic, insta, utip, site } = require('../../utils/emoji.json');

module.exports = {
    data: new SlashCommandBuilder().setName('soutenir').setDescription('Tu obtiendras des liens vers tous les endroits ou tu peux retrouver/aider Zefut !'),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        //const { options } = interaction;

        const logs = new MessageEmbed().setTitle('/Soutenir').setTimestamp().setFooter({ text: interaction.member.user.username });
        const response = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Deviens une superbe personne !')
            .setDescription('Grace à tous ces magnifiques boutons tu peux soutenir zefut de pleins de manière différentes !\n \n **CODE CREATEUR** : *ZEFUT*');

        interaction.reply({
            embeds: [response],
            components: [
                new MessageActionRow().addComponents(
                    new MessageButton().setLabel('').setStyle('LINK').setURL('https://store.epicgames.com/fr/').setEmoji(interaction.guild.emojis.cache.get(epic)),
                    new MessageButton().setLabel('').setStyle('LINK').setURL('https://www.twitch.tv/zefut').setEmoji(interaction.guild.emojis.cache.get(twitch)),
                    new MessageButton().setLabel('').setStyle('LINK').setURL('https://www.instagram.com/zefutoff/').setEmoji(interaction.guild.emojis.cache.get(insta)),
                    new MessageButton().setLabel('').setStyle('LINK').setURL('https://www.zefut.fr').setEmoji(interaction.guild.emojis.cache.get(site)),
                    new MessageButton().setLabel('').setStyle('LINK').setURL('https://utip.io/zefut').setEmoji(interaction.guild.emojis.cache.get(utip))
                )
            ]
        });

        return interaction.guild.channels.cache.get(log).send({ embeds: [logs.setDescription(`La commande a été exécutée avec succès !`)] });
    }
};
