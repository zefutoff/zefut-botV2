//Marche pas
import { APIInteractionDataResolvedGuildMember, GuildMember, SlashCommandBuilder } from 'discord.js';
import { logs, response } from '../utils/embed';
import { SlashCommand } from '../clientdata';

const isGuildMember = (obj: GuildMember | APIInteractionDataResolvedGuildMember | null): obj is GuildMember => {
    return obj !== null && 'id' in obj;
};

export const command: SlashCommand = {
    name: 'renommer',
    data: new SlashCommandBuilder()
        .setName('renommer')
        .setDescription('Permet de renomer un les utilisateurs')
        .addSubcommand(subcommand =>
            subcommand
                .setName('all')
                .setDescription('Renomme tous les utilisateurs du discord')
                .addStringOption(option =>
                    option.setName('username').setDescription("Nouveau nom d'utilisateur").setMaxLength(32).setRequired(true)
                )
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Renommer un utilisateur')
                .addUserOption(option =>
                    option.setName('user').setDescription("Utilisateur concerné par la demande d'information").setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('username').setDescription("Nouveau nom d'utilisateur").setMaxLength(32).setRequired(true)
                )
        ),
    execute: async interaction => {
        const { options } = interaction;

        const Username = options.getString('username');

        if (Username === null) {
            return;
            //a faire
        }

        if (options.getSubcommand() === 'all') {
            await interaction.guild?.members.cache.forEach(
                member => console.log(member.user.username)
                //member.setNickname(Username).catch(e => console.log('[Dev] - ERROR', `Je ne parviens pas à renommer ${member.user}\n \`${e}\``))
            );

            logs(interaction, 'Membre renommé', `**${interaction.user} à renommer tous les membres du serveur**`);

            response(interaction, `✅ Tous les membres on étaient renommés en **${Username}**`);
        } else if (options.getSubcommand() === 'user') {
            const User = options.getMember('user');

            if (!isGuildMember(User)) {
                return;
                //a faire
            }

            interaction.guild?.members.cache
                .get(User?.id)
                ?.setNickname(Username)
                .catch(e => logs(interaction, '[Dev] - ERROR', `Je ne parviens pas à renommer ${User.user}\n \`${e}\``));

            logs(interaction, 'Membre renommé', `**${interaction.user} à renommé ${User?.user}**`);

            response(interaction, `✅ ${User?.user.tag} à était renommé !`);
        }
    }
};
