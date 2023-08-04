import {
    AnySelectMenuInteraction,
    ButtonInteraction,
    ChannelSelectMenuInteraction,
    ChatInputCommandInteraction,
    ContextMenuCommandBuilder,
    Interaction,
    InteractionType,
    MentionableSelectMenuInteraction,
    ModalSubmitInteraction,
    RoleSelectMenuInteraction,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    UserSelectMenuInteraction
} from 'discord.js';

export const isChatInputCommand = (obj: Interaction): obj is ChatInputCommandInteraction => {
    return obj.type === InteractionType.ApplicationCommand;
};

export type SlashCommand = {
    name: string;
    data:
        | SlashCommandBuilder
        | SlashCommandSubcommandsOnlyBuilder
        | Omit<SlashCommandBuilder, 'addSubCommand' | 'addSubCommandGroup'>
        | ContextMenuCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export type Buttons = {
    name: string;
    execute: (interaction: ButtonInteraction) => Promise<void>;
};

export type BotEvent = {
    name: string;
    once?: boolean | false;
    execute: (...args: any[]) => void;
};

export type SelectMenu = {
    name: string;
    execute: (
        interaction:
            | AnySelectMenuInteraction
            | MentionableSelectMenuInteraction
            | ChannelSelectMenuInteraction
            | RoleSelectMenuInteraction
            | UserSelectMenuInteraction
    ) => Promise<void>;
};

export type ModalSubmit = {
    name: string;
    execute: (interaction: ModalSubmitInteraction) => Promise<void>;
};
type ClientData = {
    slashCommands: Map<string, SlashCommand>;
    buttons: Map<string, Buttons>;
    selectMenus: Map<string, SelectMenu>;
    modals: Map<string, ModalSubmit>;
};

export type Comment = {
    comment: string;
    date: Date;
    author: string;
};

export const clientData: ClientData = {
    slashCommands: new Map<string, SlashCommand>(),
    buttons: new Map<string, Buttons>(),
    selectMenus: new Map<string, SelectMenu>(),
    modals: new Map<string, ModalSubmit>()
};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string;
            TOKEN: string;
            GUILDID: string;
            WEBHOOKID: string;
            WEBHOOKTOKEN: string;
            TYPE: string;
            PROJECT_ID: string;
            PRIVATE_KEY_ID: string;
            PRIVATE_KEY: string;
            CLIENT_EMAIL: string;
            CLIENT_ID1: string;
            AUTH_URI: string;
            TOKEN_URI: string;
            AUTH_PROVIDER_X509_CERT_URL: string;
            CLIENT_X509_CERT_URL: string;
        }
    }
}
