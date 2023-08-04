import { ModalSubmit } from '../clientdata';
import { rspModal, sendReport } from '../utils/embed';

export const modal: ModalSubmit = {
    name: 'moderator_report',
    execute: async interaction => {
        sendReport(interaction, ` rencontre un problème avec un modérateur`);
        rspModal(interaction, 'aux administrateurs');
    }
};
