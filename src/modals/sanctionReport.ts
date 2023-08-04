import { ModalSubmit } from '../clientdata';
import { rspModal, sendReport } from '../utils/embed';

export const modal: ModalSubmit = {
    name: 'sanction_report',
    execute: async interaction => {
        sendReport(interaction, ` conteste une sanction`);
        rspModal(interaction, 'administrateurs');
    }
};
