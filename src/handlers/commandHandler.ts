import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { REST, Routes } from 'discord.js';
import { clientData, SlashCommand } from '../clientdata';

module.exports = async (client: Client) => {
    const slashCommandsDir = join(__dirname, '../slashCommands');
    const body: any = [];

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith('.js')) return;

        const command: SlashCommand = require(`${slashCommandsDir}/${file}`).command;
        clientData.slashCommands.set(command.name, command);

        console.log('✅ Commande : ' + command.name);

        if ('toJSON' in command.data) body.push(command.data.toJSON());
    });

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: body });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};
