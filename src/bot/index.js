import fs from 'node:fs';
import path from 'node:path';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';
import { config } from './../api/config.js';
import { fileURLToPath, pathToFileURL } from 'url';

const token = config.bot_token;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(token);
client.once(Events.ClientReady, (readyClient) => {
    console.log(`${readyClient.user.displayName} is online.`);
});

client.commands = new Collection();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const fileUrl = pathToFileURL(filePath);
    const module = await import(fileUrl);
    const command = module.default;
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        //console.log(command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

//console.log(client.commands);
client.on(Events.InteractionCreate, async (interaction) => {
    //console.log(command);
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching command "${interaction.commandName}" found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        }
    }
});