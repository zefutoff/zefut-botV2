const { MessageEmbed, WebhookClient, GuildMember } = require('discord.js');
const { webhookId, webhookToken } = require('../../config.json');
const { messages } = require('../../utils/welcomeMsg.json');
const listChannels = require('../../utils/channels.json');

module.exports = {
    name: 'guildMemberAdd',
    /**
     *
     * @param {GuildMember} member
     */
    execute(member) {
        const { user, guild } = member;
        const random = Math.floor(Math.random() * messages.length);

        const missano = new WebhookClient({
            id: webhookId,
            token: webhookToken
        });

        const msg = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL() })
            .setDescription(messages[random].sentence)
            .setTimestamp()
            .setFooter({ text: messages[random].userName });

        missano.send({ embeds: [msg] });
    }
};
