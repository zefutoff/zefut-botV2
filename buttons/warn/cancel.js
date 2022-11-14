const { error } = require('../../utils/embed');

const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = {
    name: 'False',
    async execute(client, interaction) {
        error(interaction, `❌ Le warn à était annulé.`);
    }
};
