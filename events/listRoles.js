const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { log } = require('../utils/channels.json');
const listRoles = require('../utils/roles.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('ok');
        client.guilds.cache.get('716986254926807060').roles.cache.forEach(role => {
            listRoles[`${role.name}`] = role.id;

            fs.writeFile('./utils/roles.json', JSON.stringify(listRoles, null, 4), err => {
                if (err) console.log('Erreur :' + err);
            });
        });
    }
};
