import {
    ActionRowBuilder,
    EmbedBuilder,
    ModalSubmitInteraction,
    CommandInteraction,
    AnySelectMenuInteraction,
    GuildMember,
    TextChannel,
    ButtonBuilder,
    StringSelectMenuBuilder,
    ButtonInteraction
} from 'discord.js';

import { log, administrator } from './channels.json';

export function error(interaction: CommandInteraction | ButtonInteraction | AnySelectMenuInteraction, description: string) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#ED4245').setDescription(description)],
        ephemeral: true
    });
}

export function sendReport(interaction: ModalSubmitInteraction, title: string) {
    const textChannel = interaction.guild?.channels.cache.get(administrator) as TextChannel;
    textChannel.send({
        embeds: [
            new EmbedBuilder()
                .setTitle(interaction.member?.user.username + title)
                .setDescription(interaction.fields.getTextInputValue('description'))
        ]
    });
}

export function response(interaction: AnySelectMenuInteraction | CommandInteraction | ButtonInteraction, description: string) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#57F287').setDescription(description)],
        ephemeral: true
    });
}

export function rspInfo(interaction: CommandInteraction, description: string, User: GuildMember) {
    return interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setColor('#57F287')
                .setThumbnail(User.displayAvatarURL())
                .setTitle(`Voici les informations concernant ${User.displayName} :`)
                .setDescription(description)
                .setTimestamp()
        ],
        ephemeral: true
    });
}

export function rspInfoComp(
    interaction: CommandInteraction,
    title: string,
    description: string,
    avatar: string,
    components: ActionRowBuilder<ButtonBuilder>
) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#57F287').setThumbnail(avatar).setTitle(title).setDescription(description).setTimestamp()],
        components: [components],
        ephemeral: true
    });
}

export function rspModal(interaction: ModalSubmitInteraction, target: string) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#57F287').setDescription(`✅ ta demande à était transmise ${target} !`)],
        ephemeral: true
    });
}

export function rspComponents(
    interaction: CommandInteraction | ButtonInteraction,
    title: string,
    description: string,
    components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>
) {
    return interaction.reply({
        embeds: [new EmbedBuilder().setTitle(title).setColor('#57F287').setDescription(description)],
        components: [components],
        ephemeral: true
    });
}

export function permError(interaction: CommandInteraction) {
    return interaction.reply({
        embeds: [
            new EmbedBuilder().setColor('#ED4245').setDescription(`❌ Tu n'as pas les permissions requises pour utiliser cette commande !`)
        ],
        ephemeral: true
    });
}

export function logs(interaction: AnySelectMenuInteraction | CommandInteraction | ButtonInteraction, title: string, description: string) {
    const textChannel = interaction.guild?.channels.cache.get(log) as TextChannel;
    return textChannel.send({
        embeds: [
            new EmbedBuilder()
                .setColor('#ED4245')
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()
                .setFooter({ text: `${interaction.member?.user.username}` })
        ]
    });
}
