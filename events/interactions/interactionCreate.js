const { Interaction, MessageEmbed } = require('discord.js');

const { log } = require('../../utils/channels.json');

module.exports = {
    name: 'interactionCreate',
    /**
     *
     * @param {Interaction} interaction
     * @returns
     */
    async execute(interaction, client) {
        const logs = new MessageEmbed().setColor('RED').setTitle('').setTimestamp().setFooter({ text: interaction.member.user.username });

        const interactionErro = interaction.guild.channels.cache.get(log).send({
            embeds: [logs.setTitle('[Dev] - Interaction  inconu').setDescription(`Une interaction inconu à était reçu : **${interaction.customId}**`)]
        });

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
            if (!menu) return interactionErro;
            btn.execute(client, interaction);
        }

        if (interaction.isSelectMenu()) {
            const menu = interaction.client.selectMenu.get(interaction.customId.substring(0, interaction.customId.indexOf(',')));
            if (!menu) return interactionErro;
            menu.execute(client, interaction);
        }
    }
};
