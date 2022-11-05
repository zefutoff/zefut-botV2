const { CommandInteraction, Client, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emitt')
        .setDescription('Event emitter')
        .addStringOption(option =>
            option
                .setName('command')
                .setDescription('Choose command to emitt.')
                .addChoices({ name: 'guildMemberAdd', value: 'guildMemberAdd' })
                .addChoices({ name: 'guildMemberRemove', value: 'guildMemberRemove' })
                .addChoices({ name: 'messageCreate', value: 'messageCreate' })
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
                    interaction.client.emit('guildMemberRemove', interaction.member);
                    interaction.reply({ content: 'Emitted the event.', ephemeral: true });
                }
                break;
            case 'messageCreate': {
                interaction.client.emit('messageCreate', interaction.member);
                interaction.reply({ content: 'Emitted the event.', ephemeral: true });
            }
        }
    }
};
