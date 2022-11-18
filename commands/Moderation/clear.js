const { PermissionsBitField, CommandInteraction, SlashCommandBuilder } = require('discord.js');
const { permError, logs, error, response } = require('../../utils/embed');
const { log } = require('../../utils/channels.json');

module.exports = {
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
                .addNumberOption(option => option.setName('nombre').setDescription('Nombre de message à suppirmer').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('message')
                .setDescription('Supprime les messages du channel')
                .addNumberOption(option => option.setName('nombre').setDescription('Nombre de message à suppirmer').setRequired(true))
        ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const Number = options.getNumber('nombre');

        const Messages = await channel.messages.fetch();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return permError(interaction);
        }

        if (Number > 100 || Number <= 0) {
            return error(interaction, '❌ Le nombre de messages à supprimer doit être compris entre 1 et 100');
        }

        if (options.getSubcommand() === 'usermessage') {
            const User = options.getMember('user');

            if (
                User.permissions.has(PermissionsBitField.Flags.ManageMessages) &&
                !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)
            ) {
                return error(interaction, `❌ Tu ne peux pas supprimer les messages de ${User}`);
            }

            let i = 0;
            const filtered = [];
            (await Messages).filter(m => {
                if (m.author.id === User.id && Number > i) {
                    filtered.push(m);
                    i++;
                }
            });

            await channel.bulkDelete(filtered, true).then(messages => {
                logs(
                    interaction,
                    'Message supprimés',
                    `**${messages.size}** message(s) suprimmés \n \n De **${interaction.member.user.username}** \n  \n Dans le channel **${channel}**`
                );

                response(interaction, `✅ ${messages.size} messages de ${User} ont étaient supprimés`);
            });
        }

        if (options.getSubcommand() === 'message') {
            await channel.bulkDelete(Number, true).then(messages => {
                logs(interaction, 'Message supprimés', `**${messages.size}** message(s) suprimmés \n \n Dans le channel **${channel}**`);

                response(interaction, `✅ ${messages.size} messages ont bien étaient supprimés !`);
            });
        }
    }
};
