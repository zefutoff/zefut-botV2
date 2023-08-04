import { BotEvent } from '../clientdata';
import { Client, Events } from 'discord.js';

const event: BotEvent = {
    name: Events.VoiceServerUpdate,
    once: false,
    execute(interaction) {
        console.log(interaction);
        console.log('voice !');
    }
};

export default event;
