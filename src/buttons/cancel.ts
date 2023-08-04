import { Buttons } from '../clientdata';

import { error } from '../utils/embed';

export const button: Buttons = {
    name: 'False',
    execute: async interaction => {
        await interaction.channel?.messages.fetch(interaction.message.id).then(message => {
            message.embeds[0].fields.forEach(field => {
                if (field.customId === `Cancel`) {
                    field.disabled = true;
                }
            });
        });
        error(interaction, `❌ Le warn à était annulé.`);
    }
};
