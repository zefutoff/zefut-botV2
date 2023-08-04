import {
    ModalBuilder,
    ChatInputCommandInteraction,
    AnySelectMenuInteraction,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle
} from 'discord.js';

export function reportModal(interaction: AnySelectMenuInteraction, title: string, id: string) {
    const modal = new ModalBuilder()
        .setCustomId(id)
        .setTitle(title)
        .addComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(
                new TextInputBuilder()
                    .setCustomId('description')
                    .setLabel('Explique nous la situation')
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(100)
                    .setRequired(true)
            )
        );

    return interaction.showModal(modal);
}

export function decorateModal(interaction: ChatInputCommandInteraction, title: string, id: string) {
    return interaction.showModal(new ModalBuilder().setTitle(title).setCustomId(id));
}
