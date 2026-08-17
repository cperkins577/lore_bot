import express from 'express';
const apiRouter = express.Router();
import {getDirectories, getEntryById} from "../controllers/dbWorldloreController.js";

import godsRouter from './godsRouter.js';


apiRouter.use('/gods', godsRouter);

apiRouter.get('/', getDirectories);

apiRouter.get('/entries/:id', getEntryById);

export default apiRouter;