const { Message, MessageEmbed } = require('discord.js');

const { log, aide1 } = require('../../utils/channels.json');

module.exports = {
    name: 'messageCreate',
    /**
     *
     * @param {Message} message
     * @returns
     */
    async execute(message, client) {
        if (message.content.replace(/\s/g, '').toLocaleLowerCase().includes('chocolatine')) {
            message.guild.channels.cache
                .get(message.channelId)
                .send(`${message.author} tu as fait une faute de français... :bread: + :chocolate_bar: = Pain au Chocolat`);
            message.delete();
        }
    }
};
