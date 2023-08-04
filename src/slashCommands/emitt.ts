import { SlashCommandBuilder, PermissionsBitField, GuildMember, APIInteractionDataResolvedGuildMember } from 'discord.js';
import { SlashCommand } from '../clientdata';

const isGuildMember = (obj: GuildMember | APIInteractionDataResolvedGuildMember | null): obj is GuildMember => {
    return obj !== null && 'id' in obj;
};

export const command: SlashCommand = {
    name: 'emitt',
    data: new SlashCommandBuilder()
        .setName('emitt')
        .setDescription('Event emitter')
        .addStringOption(option =>
            option
                .setName('command')
                .setDescription('Choose command to emitt.')
                .addChoices({ name: 'guildMemberAdd', value: 'guildMemberAdd' })
                .addChoices({ name: 'guildMemberRemove', value: 'guildMemberRemove' })
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    execute: async interaction => {
        const { client, member, options } = interaction;
        const choices = options.getString('command');

        if (choices === null) {
            return;
            //a faire
        }

        if (!isGuildMember(member)) {
            return;
            //a faire
        }

        switch (choices) {
            case 'guildMemberAdd':
                {
                    client.emit('guildMemberAdd', member);
                    interaction.reply({ content: 'Emitted the event.', ephemeral: true });
                }
                break;
            case 'guildMemberRemove':
                {
                    client.emit('guildMemberRemove', member);
                    interaction.reply({ content: 'Emitted the event.', ephemeral: true });
                }
                break;
        }
    }
};
