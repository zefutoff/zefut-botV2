import {
    SlashCommandBuilder,
    ModalBuilder,
    Client,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    PermissionsBitField
} from 'discord.js';
import { SlashCommand } from '../clientdata';
import { decorateModal } from '../utils/modal';

export const command: SlashCommand = {
    name: 'decoration',
    data: new SlashCommandBuilder()
        .setName('decoration')
        .setDescription('Option de decoration pour le serveur selon le thème choisi.')
        .addStringOption(option =>
            option
                .setName('action')
                .setDescription('Choisir une action')
                .addChoices({ name: 'definir', value: 'definir' })
                .addChoices({ name: 'ajouter', value: 'ajouter' })
                .addChoices({ name: 'modifier', value: 'modifier' })
                .addChoices({ name: 'supprimer', value: 'supprimer' })
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels),

    execute: async interaction => {
        const choices = interaction.options.getString('action');

        switch (choices) {
            case 'definir':
                {
                    decorateModal(interaction, 'Definir le thème', 'definir');
                }
                break;
            case 'ajouter':
                {
                    decorateModal(interaction, 'Ajouter un thème', 'ajouter');
                }
                break;
            case 'modifier':
                {
                    decorateModal(interaction, 'Modifier un thème', 'modifier');
                }
                break;
            case 'supprimer': {
                decorateModal(interaction, 'Supprimer un thème', 'supprimer');
            }
        }
    }
};
