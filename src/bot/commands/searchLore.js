import {ActionRowBuilder, ButtonBuilder, EmbedBuilder, SlashCommandBuilder, ButtonStyle } from 'discord.js';
import { config } from '../../api/config.js';

export default {
    data: new SlashCommandBuilder()
        .setName('searchlore')
        .setDescription('Begin a search through world lore.'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const apiUrl = `http://lorebot-api:${config.port}/api/`;
            const response = await fetch(apiUrl);
            const data = await response.json();
/*
            const formattedTags = data.tags.map(tag => `\`#${tag}\``).join(', ');

            let entries = [];

            data.forEach(entry => {
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(entry.title)
                    .setDescription(entry.summary);
                console.log(entry);
                entries.push(entry);
            });
*/
            const entries = data.map(entry => {
                return new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(entry.title)
                    .setDescription(entry.summary);
            });

            const rows = [];
            for (let i = 0; i < data.length; i += 5) {
                const row = new ActionRowBuilder();
                for (let j = i; j < Math.min(i + 5, data.length); ++j) {
                    const entry = data[j];
                    // Might need to make this trim titles that are over 80 chars
                    const label = entry.title;
                    row.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`lore:${entry._id ?? j}`)
                            .setLabel(label)
                            .setStyle(ButtonStyle.Primary)
                    );
                }
                rows.push(row);
            }

            await interaction.editReply({ content: "Select a category!", embeds: entries, components: rows });
        } catch (err) {
            await interaction.editReply({ content: `There was an error. ${err}` });
        }
    },
};