const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
const { log } = require('../../utils/channels.json');
const moment = require('moment');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription("Permet d'obtenir des informations sur un utilisateur")
        .addUserOption(option => option.setName('user').setDescription("Utilisateur concerné par la demande d'information").setRequired(true)),

    /**
     * @param {CommandInteraction} interaction
     * @returns
     */

    async execute(interaction) {
        const { options } = interaction;

        const User = options.getMember('user');
        const error = new MessageEmbed().setColor('RED');

        var warnNbr = 0;

        const logs = new MessageEmbed().setColor('RED').setTitle('Commande info').setTimestamp().setFooter({ text: interaction.member.user.username });

        const warn = db.collection('warn').doc(User.id);
        const doc = await warn.get();

        if (doc.exists) {
            warnNbr = doc._fieldsProto.numberWarn.integerValue;
        }

        const response = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(User.displayAvatarURL())
            .setTitle(`Voici les informations concernant ${User.user.username} :`)
            .addField(
                `:file_folder: ${User.user.username}`,
                `**Nom Complet :** ${User.user.tag}
            **Surnom :** ${User.nickname === null ? 'Aucun' : `${User.nickname}`}
            **Id :** ${User.id}
            **Compte Crée le** ${moment(User.user.createdAt).format('DD/MM/YYYY | HH:mm')}
            **Présent sur le serveur depuis le** ${moment(User.joinedAt).format('DD/MM/YYYY | HH:mm')}
            **Nombre d'infraction(s) :** ${warnNbr}
        `
            )
            .setTimestamp();

        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply({ embeds: [error.setDescription(`❌ Tu n'as pas les permissions requises pour utiliser cette commande !`)], ephemeral: true });
        }

        if (warnNbr === 0) {
            return interaction.reply({
                embeds: [
                    response.setFooter({
                        text:
                            `Une copie de ces infortmations on étaient envoyés dans le salon ${interaction.guild.channels.cache.get(log).name}\n ` +
                            interaction.member.user.username
                    })
                ],
                ephemeral: true
            });
        }
        interaction.reply({
            embeds: [
                response.setFooter({
                    text:
                        `Une copie de ces infortmations on étaient envoyés dans le salon ${interaction.guild.channels.cache.get(log).name}\n ` +
                        interaction.member.user.username
                })
            ],
            components: [
                new MessageActionRow().addComponents(
                    new MessageButton().setLabel('Voir les avertissements').setStyle('PRIMARY').setCustomId(`WarnInfo, ${User.id}, ${User}`)
                )
            ],
            ephemeral: true
        });

        interaction.guild.channels.cache.get(log).send({
            embeds: [response.setFooter({ text: `${interaction.member.user.username}` })]
        });
    }
};
