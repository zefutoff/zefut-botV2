const { logs, response } = require('../../utils/embed');
const { youtube, twitch, Mcreator } = require('../../utils/roles.json');

module.exports = {
    name: 'manageRoles',
    async execute(client, interaction) {
        const data = interaction.customId.split(', ');
        const userId = data[1];
        const user = interaction.guild.members.cache.get(userId);

        if (interaction.values.includes(youtube)) {
            await interaction.guild.members.cache.get(userId).roles.add(youtube);
        }

        if (interaction.values.includes(twitch)) {
            await interaction.guild.members.cache.get(userId).roles.add(twitch);
        }

        if (interaction.values.includes(Mcreator)) {
            await interaction.guild.members.cache.get(userId).roles.add(Mcreator);
        }

        response(interaction, `✅ Tes roles on étaient mis à jour.`);

        logs(interaction, 'Roles', `${user} à modifier ces roles.`);
    }
};
