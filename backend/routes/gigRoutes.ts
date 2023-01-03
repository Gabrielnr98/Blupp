import * as express from 'express';

import {
    getAllGigsHandler,
    createGigHandler,
    getGigHandler,
    updateGigHandler,
    deleteGigHandler,
} from '../controllers/gigController';
const gigRoutes = express.Router();

gigRoutes.route('/').get(getAllGigsHandler).post(createGigHandler);
gigRoutes
    .route('/:id')
    .get(getGigHandler)
    .put(updateGigHandler)
    .delete(deleteGigHandler);

export default gigRoutes;
