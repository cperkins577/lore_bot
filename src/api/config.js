import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    database: process.env.MONGODB_URI,
    bot_token: process.env.DISCORD_TOKEN,
    bot_id: process.env.DISCORD_APP_ID,
    bot_pubkey: process.env.DISCORD_PUBLIC_KEY,
    bot_guild_id: process.env.DEVELOPMENT_GUILD_ID,
};