const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
    credential: cert(serviceAccount)
});

//Chargement des commandes
fs.readdirSync((dir = './commands/')).forEach(dirs => {
    const commandFiles = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./${dir}/${dirs}/${file}`);
        client.commands.set(command.data.name, command);
        console.log(command.data.name + ' --> succès !');
    }
});

//Chargement des événements
fs.readdirSync((dir = './events/')).forEach(dirs => {
    const eventFiles = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`./${dir}/${dirs}/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Command failed', ephemeral: true });
        }
    }
});

// Connexion à Discord avec le token du client
client.login(token);
