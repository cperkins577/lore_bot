import express from 'express';
const godsRouter = express.Router();

import {getEntry, getEntryBySlug} from "../controllers/dbWorldloreController.js";

godsRouter.get('/', getEntry);
godsRouter.get('/:slug', getEntryBySlug);

export default godsRouter;