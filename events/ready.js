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
            listRoles[`${role.name.replace(/[&\/\\#,+()$~%.│'":*?<>{}]|([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')}`] = role.id;

            fs.writeFile('./utils/roles.json', JSON.stringify(listRoles, null, 4), err => {
                if (err) console.log('Erreur :' + err);
            });
        });

        client.guilds.cache.get(guildId).channels.cache.forEach(channel => {
            listChannels[`${channel.name.replace(/[&\/\\#,+()$~%.│'":*?<>{}]|([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')}`] = channel.id;

            fs.writeFile('./utils/channels.json', JSON.stringify(listChannels, null, 4), err => {
                if (err) console.log('Erreur :' + err);
            });
        });
    }
};
