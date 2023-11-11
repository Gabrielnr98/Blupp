import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';

import {
    createWebsite,
    deleteWebsite,
    getWebsiteById,
    getWebsites,
    updateWebsite,
} from '../services/websiteService';

// @desc Get all Website
// @route GET /api/Website
// @access Public
export const getWebsitesHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const Websites = await getWebsites();

        res.status(200).json(Websites);
    }
);

// @desc Create a new Website
// @route POST /api/Website
// @access Public
export const createWebsiteHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const createdWebsite = await createWebsite(req.body);

        res.status(201).json(createdWebsite);
    }
);

// @desc Get a Website by id
// @route GET /api/Website/:id
// @access Public
export const getWebsiteHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const Website = await getWebsiteById(req.params.id);

        res.status(200).json(Website);
    }
);

// @desc Delete a Website by id
// @route DELETE /api/Website/:id
// @access Private
export const deleteWebsiteHandler = asyncHandler(
    async (req: Request, res: Response) => {
        await deleteWebsite(req.params.id);

        res.status(200).json({
            message: `Website ${req.params.id} deleted`,
        });
    }
);

// @desc Update a Website by id
// @route PUT /api/Website/:id
// @access Private
export const updateWebsiteHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const Website = await updateWebsite(req.params.id, req.body);

        res.json(Website);
    }
);
