import express from 'express';
const apiRouter = express.Router();

import godsRouter from './godsRouter.js';


apiRouter.use('/gods', godsRouter);



export default apiRouter;