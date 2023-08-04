import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { clientData } from '../clientdata';
import { Buttons } from '../clientdata';

module.exports = async (client: Client) => {
    const buttonDir = join(__dirname, '../buttons');

    readdirSync(buttonDir).forEach(file => {
        if (!file.endsWith('.js')) return;

        const btn: Buttons = require(`${buttonDir}/${file}`).button;

        clientData.buttons.set(btn.name, btn);

        console.log('✅ Boutton : ' + btn.name);
    });
};
