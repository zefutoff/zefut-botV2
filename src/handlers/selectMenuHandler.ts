import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { clientData } from '../clientdata';
import { SelectMenu } from '../clientdata';

module.exports = async (client: Client) => {
    const selectMenuDir = join(__dirname, '../selectsMenu');

    readdirSync(selectMenuDir).forEach(file => {
        if (!file.endsWith('.js')) return;

        const sMenu: SelectMenu = require(`${selectMenuDir}/${file}`).selectMenu;
        clientData.selectMenus.set(sMenu.name, sMenu);
        console.log('✅ Menu de selection : ' + sMenu.name);
    });
};
