const { Message, PermissionsBitField } = require('discord.js');

const { logs } = require('../../utils/embed');

const { log, aide1 } = require('../../utils/channels.json');
const { bannedWords } = require('../../utils/bannedWords.json');
const { bannedVersions } = require('../../utils/bannedVersions.json');
const { twitch } = require('../../utils/emoji.json');

module.exports = {
    name: 'messageCreate',

    async execute(message, client) {
        if (message.author.bot) return;

        const user = message.member.user;
        const userName = user.username;

        if (message.mentions.members.size > 0) {
            logs(
                message,
                '[Log-mention]',
                `**Message contenant la mention :** ${message.content} \n \n **De :**${userName} \n  \n **Dans le channel :**${message.channel}`
            );

            if (message.mentions.members.first().user.id === '386931324042084354') {
                message.react(twitch);
            }
        }

        for (let index = 0; index < bannedWords.length; index++) {
            if (message.content.replace(/\s/g, '').toLocaleLowerCase().includes(bannedWords[index].word)) {
                if (bannedWords[index].exlued === '%admin%' && admin() == true) return;
                if (bannedWords[index].exlued === '%ban%' && banMember() == true) return;
                if (bannedWords[index].exlued === '%message%' && manageMessage() == true) return;

                message.guild.channels.cache.get(message.channelId).send(bannedWords[index].response.replaceAll('%username%', user));

                logs(
                    message,
                    '[Auto-mod] Message supprimé',
                    `**Message suprimmé :** ${message.content} \n \n **De :**${userName} \n  \n **Dans le channel :**${message.channel}`
                );

                if (bannedWords[index].delete === true) message.delete();
            }
        }

        //A mettre dans un fichier puis reutiliser les fonctions aux endroits necessaire comme embed.js
        function admin() {
            if (message.member.permissions.has(PermissionsBitField.FLAGS.ADMINISTRATOR)) return true;
        }

        function banMember() {
            if (message.member.permissions.has(PermissionsBitField.FLAGS.BAN_MEMBERS)) return true;
        }

        function manageMessage() {
            if (message.member.permissions.has(PermissionsBitField.FLAGS.MANAGE_MESSAGES)) return true;
        }
    }
};
