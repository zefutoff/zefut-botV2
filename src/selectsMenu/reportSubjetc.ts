import { SelectMenu } from '../clientdata';

import { reportModal } from '../utils/modal';

export const selectMenu: SelectMenu = {
    name: 'ReportSubject',
    async execute(interaction) {
        if (interaction.values.includes('sanction_report')) {
            reportModal(interaction, "Contestation d'une santcion", 'sanction_report');
        }

        if (interaction.values.includes('bug_report')) {
            reportModal(interaction, 'Rapporter un bug', 'bug_report');
        }

        if (interaction.values.includes('moderator_report')) {
            reportModal(interaction, 'Litige avec un modérateur', 'moderator_report');
        }

        if (interaction.values.includes('administrator_report')) {
            reportModal(interaction, 'Litige avec un administrateur', 'administrator_report');
        }
    }
};
