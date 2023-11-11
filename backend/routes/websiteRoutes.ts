import express from 'express';
import { authorizeWebsite } from '../models/websiteMiddleware';
import { protect } from '../models/authMiddleware';

import {
    getWebsitesHandler,
    createWebsiteHandler,
    getWebsiteHandler,
    deleteWebsiteHandler,
    updateWebsiteHandler,
} from '../controllers/websiteController';
const websiteRoutes = express.Router();

websiteRoutes
    .route('/')
    .get(protect, getWebsitesHandler)
    .post(protect, createWebsiteHandler);
websiteRoutes
    .route('/:id')
    .get(protect, authorizeWebsite({ action: 'view' }), getWebsiteHandler)
    .put(protect, authorizeWebsite({ action: 'update' }), updateWebsiteHandler)
    .delete(
        protect,
        authorizeWebsite({ action: 'delete' }),
        deleteWebsiteHandler
    );

export default websiteRoutes;
