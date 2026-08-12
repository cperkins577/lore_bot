import {EmbedBuilder, SlashCommandBuilder} from 'discord.js';
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
            const apiUrl = `http://lorebot-api:${config.port}/api/${interaction.options.getString('url')}`;
            console.log(apiUrl);
            const response = await fetch(apiUrl);
            const data = await response.json();
            //const response = await app.get(`http://localhost:${config.port}/api/${interaction.options.getString('url')}`);

            const entry = data[0];
            const formattedTags = entry.tags.map(tag => `\`#${tag}\``).join(', ');

            const embedCard = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(entry.title)
                .setDescription(entry.summary)
                .addFields(
                    { name: 'Category', value: entry.category, inline: true },
                    { name: 'Details', value: entry.body },
                    { name: 'Tags', value: formattedTags || 'None'}
                )
                .setFooter({ text: `ID: ${entry._id}` });
            //console.log(embedCard);
            await interaction.editReply({ embeds: [embedCard] });
            //await interaction.editReply({ content: `\`\`\`json\n${JSON.stringify(data, null, 2) }\n\`\`\``});
        } catch (err) {
            console.error(err);
            await interaction.editReply({ content: "There was an error trying to get Lore Page." });
        }
    },
};