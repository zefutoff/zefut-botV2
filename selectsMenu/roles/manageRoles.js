const { EmbedBuilder } = require('discord.js');
const { log, administrator } = require('../../utils/channels.json');
const { youtube, twitch, Mcreator } = require('../../utils/roles.json');

module.exports = {
    name: 'manageRoles',
    async execute(client, interaction) {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = interaction.guild.members.cache.get(userId);

        const response = new EmbedBuilder().setColor('#57F287');
        const logs = new EmbedBuilder().setColor('#ED4245').setTitle('test').setTimestamp().setFooter({ text: interaction.member.user.username });

        if (interaction.values.includes(youtube)) {
            await interaction.guild.members.cache.get(userId).roles.add(youtube);
        }

        if (interaction.values.includes(twitch)) {
            await interaction.guild.members.cache.get(userId).roles.add(twitch);
        }

        if (interaction.values.includes(Mcreator)) {
            await interaction.guild.members.cache.get(userId).roles.add(Mcreator);
        }

        interaction.reply({ embeds: [response.setDescription(`✅ Tes roles on étaient mis à jour.`)], ephemeral: true });

        interaction.guild.channels.cache.get(log).send({
            embeds: [logs.setTitle('Roles').setDescription(`${user} à modifier ces roles.`)]
        });
    }
};
