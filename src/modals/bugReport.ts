import { ModalSubmit } from '../clientdata';
import { rspModal, sendReport } from '../utils/embed';

export const modal: ModalSubmit = {
    name: 'bug_report',
    execute: async interaction => {
        sendReport(interaction, ` à trouver un bug`);
        rspModal(interaction, 'aux administrateurs');
    }
};
