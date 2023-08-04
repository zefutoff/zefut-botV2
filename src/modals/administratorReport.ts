//TO DO
//  - Mp Zefut avec le contenue du modal

import { ModalSubmit } from '../clientdata';
import { rspModal, sendReport } from '../utils/embed';

export const modal: ModalSubmit = {
    name: 'admin_report',
    execute: async interaction => {
        sendReport(interaction, ` rencontre un problème avec un administrateur`);
        rspModal(interaction, 'à Zefut');
    }
};
