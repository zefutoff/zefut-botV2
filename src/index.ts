import { config } from 'dotenv';
import { Client, GatewayIntentBits as Intents, Partials } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

config();

const client = new Client({
    intents: [
        Intents.Guilds,
        Intents.GuildMessages,
        Intents.GuildMessageReactions,
        Intents.MessageContent,
        Intents.GuildMembers,
        Intents.GuildModeration
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember]
});

const handlersDir = join(__dirname, 'handlers');

readdirSync(handlersDir).forEach(handler => {
    import(`${handlersDir}/${handler}`).then(handlerModule => {
        handlerModule.default(client);
    });
});

import { initializeApp, cert } from 'firebase-admin/app';

initializeApp({
    credential: cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY
    })
});

client.login(process.env.TOKEN);
