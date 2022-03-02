const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Permissions, MessageEmbed, CommandInteraction } = require('discord.js');
//const { archives } = require('../utils/channels.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime des messages dans un channel')
        .addNumberOption(option => option.setName('nombre').setDescription('Nombre de message à suppirmer').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription("Permet de supprimer les messages d'un seule utilisateur")),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @returns
     */

    async execute(interaction) {
        const { channel, options } = interaction;

        const Number = options.getNumber('nombre');
        const User = options.getMember('user');

        const Messages = await channel.messages.fetch();

        const logs = new MessageEmbed()
            .setColor('RED')
            .setTitle('Message clear')
            .setTimestamp()
            .setFooter({ text: `${interaction.member.user.username}, ${interaction.member.user.avatarURL()}` });

        const response = new MessageEmbed().setColor('GREEN');
        const error = new MessageEmbed().setColor('RED');

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply({ embeds: [error.setDescription(`❌ Tu n'as pas les permissions requises pour utiliser cette commande !`)], ephemeral: true });
        }

        if (Number > 100 || Number <= 0) {
            error.setDescription('❌ Le nombre de messages à supprimer doit être compris entre 1 et 100');
            return interaction.reply({ embeds: [error], ephemeral: true });
        }

        if (User) {
            if (User.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
                return interaction.reply({ embeds: [error.setDescription(`❌ Tu ne peux pas supprimer les messages de ${User}`)], ephemeral: true });

            let i = 0;
            const filtered = [];
            (await Messages).filter(m => {
                if (m.author.id === User.id && Number > i) {
                    filtered.push(m);
                    i++;
                }
            });

            await channel.bulkDelete(filtered, true).then(messages => {
                logs.setDescription(`**${messages.size}** message(s) suprimmés \n \n De **${interaction.member.user.username}** \n  \n Dans le channel **${channel}**`);
                interaction.guild.channels.cache.get('Archives').send({ embeds: [logs] });
                response.setDescription(`✅ ${messages.size} messages de ${User} ont étaient supprimés`);
                interaction.reply({ embeds: [response], ephemeral: true });
            });
        } else {
            await channel.bulkDelete(Number, true).then(messages => {
                logs.setDescription(`**${messages.size}** message(s) suprimmés \n \n Dans le channel **${channel}**`);
                interaction.guild.channels.cache.get('Archives').send({ embeds: [logs], ephemeral: true });
                response.setDescription(`✅ ${messages.size} messages ont bien étaient supprimés !`);
                interaction.reply({ embeds: [response] });
            });
        }
    }
};
