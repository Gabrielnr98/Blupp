import express from 'express';
import { protect } from '../models/authMiddleware';

import {
    getWebsitesHandler,
    createWebsiteHandler,
    getWebsiteHandler,
    deleteWebsiteHandler,
    updateWebsiteHandler,
} from '../controllers/websiteController';
const websiteRoutes = express.Router();

websiteRoutes.route('/').get(protect, getWebsitesHandler).post(createWebsiteHandler);
websiteRoutes
    .route('/:id')
    .get(getWebsiteHandler)
    .put(protect, updateWebsiteHandler)
    .delete(protect, deleteWebsiteHandler);

export default websiteRoutes;
