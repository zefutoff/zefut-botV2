const { error } = require('../../utils/embed');

module.exports = {
    name: 'False',
    async execute(client, interaction) {
        error(interaction, `❌ Le warn à était annulé.`);
    }
};
