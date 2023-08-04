import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { BotEvent } from '../clientdata';

module.exports = (client: Client) => {
    let eventsDir = join(__dirname, '../events');

    readdirSync(eventsDir).forEach(file => {
        if (!file.endsWith('.js')) return;

        const event: BotEvent = require(`${eventsDir}/${file}`).default;

        event.once
            ? client.once(event.name, (...args) => event.execute(...args))
            : client.on(event.name, (...args) => event.execute(...args));

        console.log('✅ Evenement : ' + event.name);
    });
};
