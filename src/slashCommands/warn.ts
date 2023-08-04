import {
    PermissionsBitField,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle,
    SlashCommandBuilder,
    APIInteractionDataResolvedGuildMember,
    GuildMember
} from 'discord.js';
import { SlashCommand } from '../clientdata';
import { error, response, rspComponents, logs } from '../utils/embed';

const admin = require('firebase-admin');
let db = admin.firestore();

//TODO :
//  - On peut se warn soit même

const isGuildMember = (obj: GuildMember | APIInteractionDataResolvedGuildMember | null): obj is GuildMember => {
    return obj !== null && 'id' in obj;
};

export const command: SlashCommand = {
    name: 'warn',
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription("Permet d'ajouter un avertissement à un utilisateur")
        .addUserOption(option => option.setName('user').setDescription('Utilisateur à avertir').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription("Description de l'avertissement").setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),

    execute: async interaction => {
        const { options, member } = interaction;

        const user = options.getMember('user');
        const reason = options.getString('reason');

        if (reason === null) {
            return;
            //a faire
        }

        if (!isGuildMember(user)) {
            return;
            //a faire
        }

        const warn = db.collection('warn').doc(user.id);
        const doc = await warn.get();

        const d = new Date();

        if (
            member !== null &&
            typeof member.permissions != 'string' &&
            user.permissions.has(PermissionsBitField.Flags.ManageMessages) &&
            !member.permissions.has(PermissionsBitField.Flags.Administrator)
        ) {
            error(interaction, `❌ Tu ne peux pas warn ${user}`);
            return;
        }

        if (!doc.exists) {
            const data = {
                name: `${user.user.username}`,
                numberWarn: 1,
                warn1_author: `${interaction.user.username}`,
                warn1_date: `${d.toLocaleString()}`,
                warn1_reason: `${reason}`,
                warn2_author: ``,
                warn2_date: ``,
                warn2_reason: ``,
                warn3_author: ``,
                warn3_date: ``,
                warn3_reason: ``,
                comment: ``,
                comment_date: ``
            };
            warn.set(data);

            response(interaction, `✅ **${user} a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 1**`);

            logs(
                interaction,
                'Utilisateur averti',
                `${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 1er warn`
            );
        } else {
            const warn_number = doc._fieldsProto.numberWarn.integerValue;

            if (warn_number === '1') {
                const dataUpdate = {
                    numberWarn: 2,
                    warn2_author: `${interaction.user.username}`,
                    warn2_date: `${d.toLocaleString()}`,
                    warn2_reason: `${reason}`
                };
                warn.update(dataUpdate);

                response(interaction, `✅ **${user} a été warn pour la raison suivante** : ${reason} \n **Nombre de warn : 2**`);

                logs(
                    interaction,
                    'Utilisateur averti',
                    `${user} **a été averti pour la raison suivante** : ${reason} \n Il en est à son 2eme warn`
                );
            }

            if (warn_number === '2') {
                rspComponents(
                    interaction,
                    `Alerte banissement`,
                    `${user.user} comptabilise dejà 2 warn ce qui veut dire qu'il va être bannis, confirme tu la sanction ? `,
                    new ActionRowBuilder<ButtonBuilder>().addComponents(
                        new ButtonBuilder()
                            .setLabel('CONFIRMER')
                            .setStyle(ButtonStyle.Success)
                            .setCustomId(`AddWarn, ${user?.id}, ${user}, ${reason}`),
                        new ButtonBuilder().setLabel('ANNULER').setStyle(ButtonStyle.Danger).setCustomId(`False, ${interaction}`)
                    )
                );
            }
        }
    }
};
