const { PermissionsBitField, EmbedBuilder, CommandInteraction, SlashCommandBuilder } = require('discord.js');
const { log } = require('../../utils/channels.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime des messages dans un channel')
        .addSubcommand(subcommand =>
            subcommand
                .setName('usermessage')
                .setDescription("Supprime les messages d'un utilisateur dans la channel")
                .addUserOption(option => option.setName('user').setDescription("Permet de supprimer les messages d'un seule utilisateur").setRequired(true))
                .addNumberOption(option => option.setName('nombre').setDescription('Nombre de message à suppirmer').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('message')
                .setDescription('Supprime les messages du channel')
                .addNumberOption(option => option.setName('nombre').setDescription('Nombre de message à suppirmer').setRequired(true))
        ),
    /**
     * @param {CommandInteraction} interaction
     * @returns
     */

    async execute(interaction) {
        const { channel, options } = interaction;

        const Number = options.getNumber('nombre');

        const Messages = await channel.messages.fetch();

        const logs = new EmbedBuilder().setColor('#ED4245').setTitle('Message clear').setTimestamp().setFooter({ text: interaction.member.user.username });

        const response = new EmbedBuilder().setColor('#57F287');
        const error = new EmbedBuilder().setColor('#ED4245');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({
                embeds: [error.setDescription(`❌ Tu n'as pas les PermissionsBitField requises pour utiliser cette commande !`)],
                ephemeral: true
            });
        }

        if (Number > 100 || Number <= 0) {
            error.setDescription('❌ Le nombre de messages à supprimer doit être compris entre 1 et 100');
            return interaction.reply({ embeds: [error], ephemeral: true });
        }

        if (options.getSubcommand() === 'usermessage') {
            const User = options.getMember('user');

            if (User.permissions.has(PermissionsBitField.Flags.ManageMessages) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ embeds: [error.setDescription(`❌ Tu ne peux pas supprimer les messages de ${User}`)], ephemeral: true });
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
                interaction.guild.channels.cache.get(log).send({
                    embeds: [
                        logs.setDescription(
                            `**${messages.size}** message(s) suprimmés \n \n De **${interaction.member.user.username}** \n  \n Dans le channel **${channel}**`
                        )
                    ]
                });

                interaction.reply({ embeds: [response.setDescription(`✅ ${messages.size} messages de ${User} ont étaient supprimés`)], ephemeral: true });
            });
        }

        if (options.getSubcommand() === 'message') {
            await channel.bulkDelete(Number, true).then(messages => {
                interaction.guild.channels.cache
                    .get(log)
                    .send({ embeds: [logs.setDescription(`**${messages.size}** message(s) suprimmés \n \n Dans le channel **${channel}**`)], ephemeral: true });

                interaction.reply({ embeds: [response.setDescription(`✅ ${messages.size} messages ont bien étaient supprimés !`)], ephemeral: true });
            });
        }
    }
};
