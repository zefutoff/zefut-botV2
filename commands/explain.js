const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed } = require('discord.js');
const { log } = require('../utils/channels.json');
const { helper, elu, modo } = require('../utils/roles.json');

module.exports = {
    data: new SlashCommandBuilder().setName('explain').setDescription("Explique aux membre comment bien formuler une demande d'aide Mcreator"),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const channelId = await interaction.channel.id;
        const channelName = await interaction.guild.channels.cache.get(channelId).name;

        const logs = new MessageEmbed().setTitle('/Explain').setTimestamp().setFooter(`${interaction.member.user.username}`, interaction.member.user.avatarURL());
        const response = new MessageEmbed().setColor('GREEN');
        const error = new MessageEmbed().setColor('RED');

        if (!interaction.member.roles.cache.has(elu) && !interaction.member.roles.cache.has(modo) && !interaction.member.roles.cache.has(helper))
            return interaction.reply({ embeds: [error.setDescription(`❌ Tu n'as pas les permissions requises pour utiliser cette commande !`)], ephemeral: true });

        if (channelId != '915664134585057380' && channelId != '915664134585057381')
            return interaction.reply({ embeds: [error.setDescription(`❌ Tu ne peux pas utiliser cette commande dans le channel ${channelName}`)], ephemeral: true });

        interaction.guild.channels.cache.get(channelId).send({
            embeds: [
                response.setTitle('__Pour qu’on puisse t’aider au mieux__').setDescription(
                    `✅ Définis un thème pour ta demande (gui/biome/armure/...) \n
                    ✅ Indique le but final et **détaillé** de ce que tu veux faire\n
                    ✅ **Décris** nous le **problème** que tu rencontres\n
                    ✅ Indique nous la **version** de **Mcreator** et de **Minecraft**\n
                    ✅ Joins une copie de la console (en cas de crash ou de bug avec Mcreator)\n
                    ✅ Et bien évidement pense à **relire ton message avant de l’envoyer** :wink:\n
                    ❌ **Spam** ton problème, **mentionner** 20 fois un Helper, dupliquer ton message dans tout les salons 
                    **on te répondra pas plus vite**`
                )
            ]
        });

        interaction.guild.channels.cache.get(log).send({ embeds: [logs.setDescription(`Le message lié à la commande explain a été envoyé !`)] });

        return interaction.reply({ embeds: [response.setDescription(`✅ La commande a été exécutée avec succès !`)], ephemeral: true });
    }
};
