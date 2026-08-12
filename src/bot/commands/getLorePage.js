import { SlashCommandBuilder } from 'discord.js';
import app from './../../api/app.js';
import { config } from "./../../api/config.js";

export default {
    data: new SlashCommandBuilder()
        .setName('getlorepage')
        .setDescription('Get Lore Page')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The URL of the page to fetch.')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const apiUrl = `http://localhost:${config.port}/api/${interaction.options.getString('url')}`;
            console.log(apiUrl);
            const response = await fetch(apiUrl);
            const data = await response.json();
            //const response = await app.get(`http://localhost:${config.port}/api/${interaction.options.getString('url')}`);
            await interaction.editReply({ content: JSON.stringify(data) });
        } catch (err) {
            console.error(err);
            await interaction.editReply({ content: "There was an error trying to get Lore Page." });
        }
    },
};