import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path:'./../../.env' });

export const config = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    database: process.env.MONGODB_URI,
};