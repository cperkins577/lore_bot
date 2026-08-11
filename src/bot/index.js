import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from './../api/config.js'

const token = config.bot_token;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', cli => {
    console.log(`${cli.user.displayName} is online.`);
});

client.login(token);