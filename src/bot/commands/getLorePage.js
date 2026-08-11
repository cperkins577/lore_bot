import { SlashCommandBuilder } from 'discord.js';
import app from './../../api/app.js';
import {config} from "dotenv";

let command = {
    data: new SlashCommandBuilder()
        .setName('getLorePage')
        .setDescription('Get Lore Page')
        .addStringOption(option =>
            option.setName('url')
            .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await app.get(`http://localhost:${config.port}/api/${interaction.options.getString('url')}`);
            await interaction.reply(response);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: "There was an error trying to get Lore Page." });
        }
    }
};