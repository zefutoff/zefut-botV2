const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenu = new Collection();

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
//const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

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

//Chargement des boutons
fs.readdirSync((dir = './buttons/')).forEach(dirs => {
    const buttonsFile = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

    for (const file of buttonsFile) {
        const button = require(`./${dir}/${dirs}/${file}`);
        client.buttons.set(button.name, button);
        console.log(button.name + ' --> succès !');
    }
});

//Chargement des menu de séléction
fs.readdirSync((dir = './selectsMenu/')).forEach(dirs => {
    const selectMenuFile = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));

    for (const file of selectMenuFile) {
        const selectMenu = require(`./${dir}/${dirs}/${file}`);
        client.selectMenu.set(selectMenu.name, selectMenu);
        console.log(selectMenu.name + ' --> succès !');
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

// Connexion à Discord avec le token du client
client.login(token);
