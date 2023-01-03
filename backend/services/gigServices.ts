import { checkIsValidObjectId } from '../database/db';
import GigModel from '../models/gigModel';
import { sanitizeGig } from '../sanitizers/gigSanitizer';
import { IGigSchema } from '../schema/gigSchema';
import { GigType } from '../types/gigTypes';
import { ErrorHandler } from '../utils/httpException';

export async function getAllGigs(): Promise<GigType[]> {
    try {
        const gigs = await GigModel.find();
        return gigs;
    } catch (err: unknown) {
        throw ErrorHandler(err);
    }
}

export async function createGig(gig: GigType): Promise<GigType> {
    const sanitizedGig = sanitizeGig(gig);
    try {
        const newGig = await GigModel.create(sanitizedGig);
        return newGig;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function getGig(id: string): Promise<IGigSchema> {
    checkIsValidObjectId(id);
    try {
        const gig = await GigModel.findById(id);
        if (gig == null) {
            throw new Error('Gig not found');
        }
        return gig;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function updateGig(id: string, gig: GigType): Promise<IGigSchema> {
    checkIsValidObjectId(id);
    const sanitizedGig = sanitizeGig(gig);
    try {
        const updatedGig = await GigModel.findByIdAndUpdate(id, sanitizedGig, {
            new: true,
        });
        if (updatedGig == null) {
            throw new Error('Gig not found');
        }
        return updatedGig;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function deleteGig(id: string): Promise<void> {
    checkIsValidObjectId(id);
    try {
        const gig = await GigModel.findByIdAndDelete(id);
        if (gig == null) {
            throw new Error('Gig not found');
        }
    } catch (err) {
        throw ErrorHandler(err);
    }
}
