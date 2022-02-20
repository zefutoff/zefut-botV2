const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { log } = require('../utils/channels.json');
const listChannels = require('../utils/roles.json');

module.exports = {
    name: 'listChannels',
    once: true,
    execute(client) {
        console.log(client.guilds.cache.get('716986254926807060').channels);
        // client.guilds.cache.get('716986254926807060').channels.cache.forEach(channel => {
        //     listChannels[`${channel.name}`] = channel.id;

        //     fs.writeFile('./utils/channels.json', JSON.stringify(listChannels, null, 4), err => {
        //         if (err) console.log('Erreur :' + err);
        //     });
        // });
    }
};
