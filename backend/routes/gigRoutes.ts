import express from 'express';

import {
    getAllGigsHandler,
    createGigHandler,
    getGigHandler,
    updateGigHandler,
    deleteGigHandler,
} from '../controllers/gigController';
import { protect } from '../models/authMiddleware';
const gigRoutes = express.Router();

gigRoutes.route('/').get(getAllGigsHandler).post(protect, createGigHandler);
gigRoutes
    .route('/:id')
    .get(getGigHandler)
    .put(protect, updateGigHandler)
    .delete(protect, deleteGigHandler);

export default gigRoutes;
