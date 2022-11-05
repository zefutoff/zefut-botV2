const { Message, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const { log, aide1 } = require('../../utils/channels.json');
const { bannedWords } = require('../../utils/bannedWords.json');
const { bannedVersions } = require('../../utils/bannedVersions.json');
const { twitch } = require('../../utils/emoji.json');

module.exports = {
    name: 'messageCreate',
    /**
     *
     * @param {Message} message
     * @returns
     */
    async execute(message, client) {
        const logs = new EmbedBuilder().setColor('#ED4245').setTitle('[Auto-mod] Message supprimé').setTimestamp();
        const response = new EmbedBuilder().setColor('#57F287');

        if (message.author.bot) return;

        console.log(message);
        const user = message.member.user;
        const userName = user.username;
        const userId = user.id;

        if (message.mentions.members.size > 0) {
            message.guild.channels.cache.get(log).send({
                embeds: [
                    logs
                        .setDescription(`**Message contenant la mention :** ${message.content} \n \n **De :**${userName} \n  \n **Dans le channel :**${message.channel}`)
                        .setTitle('[Log-mention]')
                ]
            });

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

                message.guild.channels.cache.get(log).send({
                    embeds: [logs.setDescription(`**Message suprimmé :** ${message.content} \n \n **De :**${userName} \n  \n **Dans le channel :**${message.channel}`)]
                });

                if (bannedWords[index].delete === true) message.delete();
            }
        }

        function admin() {
            if (message.member.PermissionsBitField.has(PermissionsBitField.FLAGS.ADMINISTRATOR)) return true;
        }

        function banMember() {
            if (message.member.PermissionsBitField.has(PermissionsBitField.FLAGS.BAN_MEMBERS)) return true;
        }

        function manageMessage() {
            if (message.member.PermissionsBitField.has(PermissionsBitField.FLAGS.MANAGE_MESSAGES)) return true;
        }
    }
};
