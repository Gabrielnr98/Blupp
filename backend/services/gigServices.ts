import { checkIsValidObjectId } from '../database/db';
import GigModel from '../models/gigModel';
import { sanitizeGig } from '../sanitizers/gigSanitizer';
import { sanitizeId } from '../sanitizers/userSanitizer';
import { IGigSchema } from '../schema/gigSchema';
import { GigType } from '../types/gigTypes';
import HttpException, { ErrorHandler } from '../utils/httpException';

export async function getAllGigs(): Promise<GigType[]> {
    try {
        const gigs = await GigModel.find();
        return gigs;
    } catch (err: unknown) {
        throw ErrorHandler(err);
    }
}

export async function createGig(
    gig: GigType,
    userId: string | undefined
): Promise<GigType> {
    const sanitizedGig = sanitizeGig(gig, userId);
    try {
        const newGig = await GigModel.create(sanitizedGig);
        return newGig;
    } catch (err: unknown) {
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

export async function updateGig(
    gigId: string,
    gig: GigType,
    userId: string | undefined
): Promise<IGigSchema> {
    checkIsValidObjectId(gigId);

    await isUserAuthorized(userId, gigId);

    const sanitizedGig = sanitizeGig(gig, userId);
    try {
        const updatedGig = await GigModel.findByIdAndUpdate(
            gigId,
            sanitizedGig,
            {
                new: true,
            }
        );
        if (updatedGig == null) {
            throw new Error('Gig not found');
        }
        return updatedGig;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function deleteGig(
    gigId: string,
    userId: string | undefined
): Promise<void> {
    checkIsValidObjectId(gigId);
    await isUserAuthorized(userId, gigId);
    try {
        const gig = await GigModel.findByIdAndDelete(gigId);
        if (gig == null) {
            throw new Error('Gig not found');
        }
    } catch (err) {
        throw ErrorHandler(err);
    }
}

async function isUserAuthorized(
    userId: string | undefined,
    gigId: string
): Promise<void> {
    const sanitizedUserId = sanitizeId(userId);
    const gigToUpdate = await getGig(gigId);

    if (sanitizedUserId !== gigToUpdate._id) {
        throw new HttpException(
            'You are not authorized to perform this action',
            401
        );
    }
}
