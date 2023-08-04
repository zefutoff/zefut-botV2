import { BotEvent, isChatInputCommand } from '../clientdata';
import { Events, Interaction } from 'discord.js';
import { clientData } from '../clientdata';

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            const command = clientData.slashCommands.get(interaction.commandName);

            if (!command) return;

            if (!isChatInputCommand(interaction)) return;
            await command.execute(interaction);
        } else if (interaction.isButton()) {
            const data = interaction.customId.split(', ');
            const customId = data[0];

            const btn = clientData.buttons.get(customId);

            if (!btn) return;
            await btn.execute(interaction);
        } else if (interaction.isAnySelectMenu()) {
            const data = interaction.customId.split(', ');
            const customId = data[0];

            const sMenu = clientData.selectMenus.get(customId);

            if (!sMenu) return;
            await sMenu.execute(interaction);
        } else if (interaction.isModalSubmit()) {
            const data = interaction.customId.split(', ');
            const customId = data[0];

            const modal = clientData.modals.get(customId);

            if (!modal) return;
            await modal.execute(interaction);
        }
    }
};

export default event;
