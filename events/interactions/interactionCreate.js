const { Interaction } = require('discord.js');

const { logs } = require('../../utils/embed');

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, client) {
        function sendMsgError(object) {
            logs(
                interaction,
                '[Dev]',
                `**${object} inconu** - Une interaction inconu à était reçu - ID de l'interaction : **${interaction.customId}**`
            );
        }

        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.log(error);
                await interaction.reply({ content: 'Command failed', ephemeral: true });
            }
        }

        if (interaction.isButton()) {
            const btn = interaction.client.buttons.get(interaction.customId.substring(0, interaction.customId.indexOf(',')));
            if (!btn) return sendMsgError('Boutton');
            btn.execute(client, interaction);
        }

        if (interaction.isSelectMenu('SelectMenu')) {
            const menu = interaction.client.selectMenu.get(interaction.customId.substring(0, interaction.customId.indexOf(',')));
            if (!menu) return sendMsgError();
            menu.execute(client, interaction);
        }
    }
};
