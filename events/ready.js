const {} = require('discord.js');
const { guildId } = require('../config.json')
const fs = require('fs')
const listRoles = require('../utils/roles.json')
const listChannels = require('../utils/channels.json')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        client.guilds.cache.get(guildId).roles.cache.forEach(role => {
            listRoles[`${role.name}`] = role.id;

            fs.writeFile('./utils/roles.json', JSON.stringify(listRoles, null, 4), err => {
                if (err) console.log('Erreur :' + err);
            });
        });

        client.guilds.cache.get(guildId).channels.cache.forEach(channel => {
            listChannels[`${channel.name}`] = channel.id;

            fs.writeFile('./utils/channels.json', JSON.stringify(listChannels, null, 4), err => {
                if (err) console.log('Erreur :' + err);
            });
        });
    }
};
