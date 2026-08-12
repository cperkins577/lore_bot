import { SlashCommandBuilder } from 'discord.js';
import app from './../../api/app.js';
import { config } from "./../../api/config.js";

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
}