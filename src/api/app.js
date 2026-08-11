import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import apiRouter from './routes/apiRouter.js';
app.use('/api', apiRouter);

export default app;