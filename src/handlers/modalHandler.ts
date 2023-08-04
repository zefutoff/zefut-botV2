import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { clientData, ModalSubmit } from '../clientdata';

module.exports = async (client: Client) => {
    const modalDir = join(__dirname, '../modals');

    readdirSync(modalDir).forEach(file => {
        if (!file.endsWith('.js')) return;

        const modal = require(`${modalDir}/${file}`).modal;

        clientData.modals.set(modal.name, modal);

        console.log('✅ Formulaire : ' + modal.name);
    });
};
