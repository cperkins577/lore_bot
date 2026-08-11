import app from './app.js';
import { config } from './config.js';
import connectDb from './../shared/database/mongodb.js';

async function startServer() {
    try {
        await connectDb();
        app.listen(config.port, () => {
            console.log(`Server started, listening on port ${config.port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
startServer();
/*
connectDb();

const server = app.listen(config.port, () => {
    console.log(`Server started, listening on port ${config.port}`);
});

startServer();
process.on('uncaughtException', (err) => {
    console.error(err);
    server.close(() => {
        process.exit(1);
    });
});
*/