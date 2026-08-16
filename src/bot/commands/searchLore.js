import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { config } from '../../api/config.js';

export default {
    data: new SlashCommandBuilder()
        .setName('searchLore')
        .setDescription('Begin a search through world lore.'),

    async execute(interaction) {
        await interaction.deferReply();

        try {

        }
    }
}