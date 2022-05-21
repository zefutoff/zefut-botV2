const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
    credential: cert(serviceAccount)
});

const commands = [];

fs.readdirSync((dir = './commands/')).forEach(dirs => {
    const commandFiles = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./${dir}/${dirs}/${file}`);
        commands.push(command.data.toJSON());
    }
});

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
