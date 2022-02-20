const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Renvoi Pong'),
    /**
     *
     * @param {SlashCommandBuilder} interaction
     */
    async execute(interaction) {
        await interaction.reply('Pong');
    }
};
