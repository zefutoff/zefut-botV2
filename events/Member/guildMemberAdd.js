const { EmbedBuilder, WebhookClient, GuildMember } = require('discord.js');
const { webhookId, webhookToken } = require('../../config.json');
const { messages } = require('../../utils/welcomeMsg.json');
const { roles, règlement } = require('../../utils/channels.json');

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

        const msg = new EmbedBuilder()
            .setColor('#57F287')
            .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL() })
            .setDescription(
                messages[random].sentence
                    .replaceAll('%username%', member.user.username)
                    .replaceAll('%roles%', guild.channels.cache.get(roles))
                    .replaceAll('%rules%', guild.channels.cache.get(règlement)),
                '%roles%',
                roles
            )
            .setTimestamp()
            .setFooter({ text: 'Message proposé par ' + messages[random].userName });

        missano.send({
            content: `Bienvenue <@${member.user.id}> ! **${messages[random].userName}** m'a demandé de te transmettre ce message :`,
            embeds: [msg]
        });
    }
};
