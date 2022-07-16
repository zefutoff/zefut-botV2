const { Message, MessageEmbed, Permissions } = require('discord.js');

const { log } = require('../../utils/channels.json');
const { bannedWords } = require('../../utils/bannedWords.json');

module.exports = {
    name: 'messageCreate',
    /**
     *
     * @param {Message} message
     * @returns
     */
    async execute(message, client) {
        const logs = new MessageEmbed().setColor('RED').setTitle('[Auto-mod] Message supprimé').setTimestamp();

        for (let index = 0; index < bannedWords.length; index++) {
            if (!message.content.replace(/\s/g, '').toLocaleLowerCase().includes(bannedWords[index].word)) return;
            if (bannedWords[index].exlued === '%admin%' && admin() == true) return;
            if (bannedWords[index].exlued === '%ban%' && banMember() == true) return;
            if (bannedWords[index].exlued === '%message%' && manageMessage() == true) return;

            message.guild.channels.cache.get(message.channelId).send(bannedWords[index].response.replaceAll('%username%', message.member.user));

            message.guild.channels.cache.get(log).send({
                embeds: [
                    logs.setDescription(
                        `**Message suprimmé :** ${message.content} \n \n **De :**${message.member.user.username} \n  \n **Dans le channel :**${message.channel}`
                    )
                ]
            });

            message.delete();
        }

        function admin() {
            if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return true;
        }

        function banMember() {
            if (message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return true;
        }

        function manageMessage() {
            if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return true;
        }
    }
};
