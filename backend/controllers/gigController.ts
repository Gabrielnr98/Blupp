import { Request, Response } from 'express';
import asyncHandler = require('express-async-handler');
import {
    getAllGigs,
    createGig,
    getGig,
    updateGig,
    deleteGig,
} from '../services/gigServices';

// Get all Gigs
export const getAllGigsHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const gigs = await getAllGigs();
        res.status(200).json({ gigs });
    }
);

// Create new Gig
export const createGigHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const gig = await createGig(req.body);
        res.status(201).json(gig);
    }
);

// Get single Gig
export const getGigHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const gig = await getGig(req.params.id);
        res.status(200).json(gig);
    }
);

// Update Gig
export const updateGigHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const gig = await updateGig(req.params.id, req.body);
        res.status(200).json(gig);
    }
);

// Delete Gig
export const deleteGigHandler = asyncHandler(
    async (req: Request, res: Response) => {
        await deleteGig(req.params.id);
        res.status(200).json({ message: `Deleted ${req.params.id}` });
    }
);
