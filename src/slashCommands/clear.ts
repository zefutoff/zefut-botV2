import {
    SlashCommandBuilder,
    PermissionsBitField,
    Message,
    GuildMember,
    APIInteractionDataResolvedGuildMember,
    TextChannel
} from 'discord.js';
import { SlashCommand } from '../clientdata';
import { logs, error, response } from '../utils/embed';

const isGuildMember = (obj: GuildMember | APIInteractionDataResolvedGuildMember | null): obj is GuildMember => {
    return obj !== null && 'id' in obj;
};

export const command: SlashCommand = {
    name: 'clear',
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime des messages dans un channel')
        .addSubcommand(subcommand =>
            subcommand
                .setName('usermessage')
                .setDescription("Supprime les messages d'un utilisateur dans la channel")
                .addUserOption(option =>
                    option.setName('user').setDescription("Permet de supprimer les messages d'un seule utilisateur").setRequired(true)
                )
                .addNumberOption(option =>
                    option.setName('nombre').setDescription('Nombre de message à suppirmer').setRequired(true).setMinValue(1)
                )
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .addSubcommand(subcommand =>
            subcommand
                .setName('message')
                .setDescription('Supprime les messages du channel')
                .addNumberOption(option =>
                    option.setName('nombre').setDescription('Nombre de message à suppirmer').setRequired(true).setMinValue(1)
                )
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

    execute: async interaction => {
        const { channel, options, member } = interaction;

        if (!isGuildMember(member)) {
            return;
            //a faire
        }

        if (channel === null) {
            return;
            //a faire
        }

        const Number = options.getNumber('nombre');

        if (Number === null) {
            return;
            //a faire
        }

        if (!channel.isTextBased()) return;

        const textChannel = channel as TextChannel;

        const Messages = await textChannel.messages.fetch();

        if (options.getSubcommand() === 'usermessage') {
            const User = options.getMember('user');

            if (!isGuildMember(User)) {
                return;
                //a faire
            }

            if (
                User.permissions.has(PermissionsBitField.Flags.ManageMessages) &&
                member.permissions.has(PermissionsBitField.Flags.Administrator)
            ) {
                error(interaction, `❌ Tu ne peux pas supprimer les messages de ${User}`);
                return;
            }

            const filtered = await Messages?.filter((m: Message) => {
                return m.author.id === User?.id;
            });

            await textChannel.bulkDelete(filtered, true).then(m => {
                logs(
                    interaction,
                    'Message supprimés',
                    `**${m.size}** message(s) suprimmés \n \n De **${member.user.username}** \n  \n Dans le channel **${channel}**`
                );

                response(interaction, `✅ ${m.size} messages de ${User} ont étaient supprimés`);
            });
        } else if (options.getSubcommand() === 'message') {
            return await textChannel.bulkDelete(Number, true).then(m => {
                logs(interaction, 'Message supprimés', `**${m.size}** message(s) suprimmés \n \n Dans le channel **${channel}**`);

                response(interaction, `✅ ${m.size} messages ont bien étaient supprimés !`);
            });
        }
    }
};
