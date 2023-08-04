import { EmbedBuilder, WebhookClient } from 'discord.js';
import { messages } from '../utils/goodbyeMsg.json';
import { roles, reglement } from '../utils/channels.json';
import { BotEvent } from '../clientdata';

const event: BotEvent = {
    name: 'guildMemberRemove',
    once: false,
    async execute(member: any) {
        const { guild } = member;
        const random = Math.floor(Math.random() * messages.length);

        const missano = new WebhookClient({
            id: process.env.WEBHOOKID,
            token: process.env.WEBHOOKTOKEN
        });

        const msg = new EmbedBuilder()
            .setColor('#ED4245')
            .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL() })
            .setDescription(
                messages[random].sentence
                    .replaceAll('%username%', member.user.username)
                    .replaceAll('%roles%', guild.channels.cache.get(roles))
                    .replaceAll('%rules%', guild.channels.cache.get(reglement))
            )
            .setTimestamp()
            .setFooter({ text: 'Ce message nous à été prposer par ' + messages[random].userName });

        missano.send({
            content: `${member.displayName} ne recevera jamais le message de **${messages[random].userName}** :smiling_face_with_tear:  !`,
            embeds: [msg]
        });
    }
};

export default event;
