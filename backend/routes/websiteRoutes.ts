import express from 'express';
import { protect } from '../models/authMiddleware';

import {
    getUsersHandler,
    createUserHandler,
    getUserHandler,
    deleteUserHandler,
    updateUserHandler,
    loginUserHandler,
} from '../controllers/userController';
const websiteRoutes = express.Router();

websiteRoutes.route('/').get(protect, getUsersHandler).post(createUserHandler);
websiteRoutes.route('/login').post(loginUserHandler);
websiteRoutes
    .route('/:id')
    .get(getUserHandler)
    .put(protect, updateUserHandler)
    .delete(protect, deleteUserHandler);

export default websiteRoutes;
