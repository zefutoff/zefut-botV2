const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emitt')
        .setDescription('Event emitter')
        .addStringOption(option =>
            option
                .setName('command')
                .setDescription('Choose command to emitt.')
                .addChoice('guildMemberAdd', 'guildMemberAdd')
                .addChoice('guildMemberRemove', 'guildMemberRemove')
                .setRequired(true)
        ),

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        const choices = interaction.options.getString('command');

        switch (choices) {
            case 'guildMemberAdd':
                {
                    interaction.client.emit('guildMemberAdd', interaction.member);
                    interaction.reply({ content: 'Emitted the event.', ephemeral: true });
                }
                break;
            case 'guildMemberRemove':
                {
                    interaction.client.emit('guildMemberRemoe', interaction.member);
                    interaction.reply({ content: 'Emitted the event.', ephemeral: true });
                }
                break;
        }
    }
};
