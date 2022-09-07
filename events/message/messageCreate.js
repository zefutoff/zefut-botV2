const { Message, MessageEmbed, Permissions, MessageActionRow, MessageButton } = require('discord.js');

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
        const logs = new MessageEmbed().setColor('RED').setTitle('[Auto-mod] Message supprimé').setTimestamp();
        const response = new MessageEmbed().setColor('GREEN');

        const user = message.member.user;
        const userName = user.username;
        const userId = user.id;

        if (message.author.bot) return;

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

        if (message.channelId === aide1) {
            for (let index = 0; index < bannedVersions.length; index++) {
                if (message.content.includes(bannedVersions[index].version)) {
                    if (bannedVersions[index].exlued === '%message%' && manageMessage() == true) return;
                    message.reply({
                        embeds: [response.setDescription(bannedVersions[index].response.replaceAll('%username%', user))],
                        components: [
                            new MessageActionRow().addComponents(
                                new MessageButton().setLabel('Comment mettre à jour mon mod ?').setStyle('LINK').setURL('https://www.youtube.com/watch?v=Ut-POeZ-V3U'),
                                new MessageButton().setLabel('Dernière version de Mcreator').setStyle('LINK').setURL('https://mcreator.net/download')
                            )
                        ],
                        ephemeral: true
                    });

                    return message.guild.channels.cache.get(log).send({
                        embeds: [
                            logs.setDescription(`**Message suprimmé :** ${message.content} \n \n **De :**${userName} \n  \n **Dans le channel :**${message.channel}`)
                        ]
                    });
                }
            }

            if (message.content.length > 20) {
                await message.channel.threads.create({
                    name: message.content.substring(0, 99).replace(/\n|\r/g, '')
                });

                const thread = message.channel.threads.cache.find(async x => (await x.name) === message.content.substring(0, 99));

                await thread.members.add(userId);

                message.guild.channels.cache.get(log).send({
                    embeds: [
                        //Message de log a refaire entirement
                        logs.setDescription(
                            `**Fils Mcreator :** ${message.content.substring(0, 99)} \n \n **De :**${userName} \n  \n **Message enovyé :**${message.content}`
                        )
                    ]
                });
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