import { EmbedBuilder, WebhookClient } from 'discord.js';
import { messages } from '../utils/welcomeMsg.json';
import { roles, reglement } from '../utils/channels.json';
import { BotEvent } from '../clientdata';

export const event: BotEvent = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member: any) {
        const { guild } = member;
        const random = Math.floor(Math.random() * messages.length);

        const missano = new WebhookClient({
            id: process.env.WEBHOOKID,
            token: process.env.WEBHOOKTOKEN
        });

        const msg = new EmbedBuilder()
            .setColor('#57F287')
            .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL() })
            .setDescription(
                messages[random].sentence
                    .replaceAll('%username%', member.user.username)
                    .replaceAll('%roles%', guild.channels.cache.get(roles))
                    .replaceAll('%rules%', guild.channels.cache.get(reglement))
            )
            .setTimestamp()
            .setFooter({ text: 'Message proposé par ' + messages[random].userName });

        missano.send({
            content: `Bienvenue <@${member.user.id}> ! **${messages[random].userName}** m'a demandé de te transmettre ce message :`,
            embeds: [msg]
        });
    }
};

export default event;
