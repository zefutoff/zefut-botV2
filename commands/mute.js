const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Permissions, MessageEmbed, CommandInteraction } = require('discord.js');
const ms = require('ms');
const { muted } = require('../utils/roles.json');
const { log } = require('../utils/channels.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Rend Muet un utilisateur')
        .addUserOption(option => option.setName('user').setDescription("L'utilisateur qui doit être rendu muet").setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription("Raison pour laquelle l'utilisateur à été mute").setRequired(false))
        .addStringOption(option =>
            option
                .setName('time')
                .setDescription('Durée du mute')
                .addChoice('10 minutes', '10m')
                .addChoice('30 minutes', '30m')
                .addChoice('1 heure', '1h')
                .addChoice('2 heures', '2h')
                .addChoice('6 heures', '6h')
                .addChoice('1 jour', '1d')
                .setRequired(false)
        )
        .addStringOption(option => option.setName('custom-time').setDescription('Durée customisé du mute').setRequired(false)),

    /**
     *
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        const { guild, member, options } = interaction;

        const User = options.getMember('user');
        const Reason = options.getString('reason') || 'Acune raison spécifie';
        const Time = options.getString('time') || options.getString('cutsom-time') || '1h'; //TO DO : Tu sais pas dev FDP

        const Mute = guild.roles.cache.get(muted);

        const logs = new MessageEmbed()
            .setColor('RED')
            .setTitle('Message clear')
            .setTimestamp()
            .setFooter({ text: `${interaction.member.user.username}, ${interaction.member.user.avatarURL()}` });

        const response = new MessageEmbed().setColor('GREEN');
        const error = new MessageEmbed().setColor('RED');

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
            return interaction.reply({ embeds: [error.setDescription("❌ Tu n'a pas la permission d'utiliser cette commande")], ephemeral: true });

        if (User.id === member.id) return interaction.reply({ embeds: [error.setDescription(`❌ Tu ne peux pas te muter toi même`)], ephemeral: true });

        if (!interaction.guild.roles.cache.get(muted))
            return interaction.followUp({ embeds: [error.setDescription("❌ Le role 'Muted' n'existe pas")], ephemeral: true });

        if (User.permissions.has(Permissions.FLAGS.MANAGE_ROLES))
            return interaction.reply({ embeds: [error.setDescription(`❌ Tu ne peux pas supprimer les messages de ${User}`)], ephemeral: true });

        await User.roles.add(Mute.id);
        console.log(ms(Time));
        setTimeout(async () => {
            if (!User.roles.cache.has(Mute.id)) return;
            await User.roles.remove(Mute);
        }, ms(Time));

        console.log('5');

        logs.setDescription(`**${interaction.member.user.username}** à était mute \n \n Pour une durée de **${Time}** \n  \n Pour la raison suivante **${Reason}**`);
        interaction.guild.channels.cache.get(log).send({ embeds: [logs] });
    }
};
