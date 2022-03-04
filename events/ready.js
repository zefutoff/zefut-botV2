const {} = require('discord.js');
const { guildId } = require('../config.json');
const fs = require('fs');
const listRoles = require('../utils/roles.json');
const listChannels = require('../utils/channels.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
};
