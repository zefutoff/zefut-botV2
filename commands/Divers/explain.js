//A retravailler car forum mtn
const { CommandInteraction, EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const { logs, response, permError } = require('../../utils/embed');
const { aide1 } = require('../../utils/channels.json');
const { helper } = require('../../utils/roles.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('explain')
        .setDescription("Explique aux membre comment bien formuler une demande d'aide Mcreator")
        .addStringOption(option =>
            option
                .setName('channel')
                .setDescription("Salon d'aide dans lequel envoyer le message")
                .addChoices({ value: `${aide1}`, name: 'Aide-Mcreator' })
                .setRequired(false)
        ),

    async execute(interaction) {
        const { options } = interaction;

        const channelId = options.getString('channel');

        const rsp = new EmbedBuilder()
            .setColor('#57F287')
            .setTitle('__Pour qu’on puisse t’aider au mieux__')
            .setDescription(
                `✅ Définis un thème pour ta demande (gui/biome/armure/...) \n
            ✅ Indique le but final et **détaillé** de ce que tu veux faire\n
            ✅ **Décris** nous le **problème** que tu rencontres\n
            ✅ Indique nous la **version** de **Mcreator** et de **Minecraft**\n
            ✅ Joins une copie de la console (en cas de crash ou de bug avec Mcreator)\n
            ✅ Et bien évidement pense à **relire ton message avant de l’envoyer** :wink:\n
            ❌ **Spam** ton problème, **mentionner** 20 fois un Helper, dupliquer ton message dans tout les salons 
            **on te répondra pas plus vite**`
            );

        if (!interaction.member.roles.cache.has(helper) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
            return permError(interaction);

        if (!channelId) {
            interaction.guild.channels.cache.get(aide1).send({ embeds: [rsp] });
        } else {
            interaction.guild.channels.cache.get(aide1).send({ embeds: [response] });
        }

        logs(interaction, '/Explain', `La commande /explain a été exécutée avec succès !`);

        return interaction.reply({
            embeds: [response.setDescription(`✅ La commande a été exécutée avec succès !`)],
            ephemeral: true
        });
    }
};
