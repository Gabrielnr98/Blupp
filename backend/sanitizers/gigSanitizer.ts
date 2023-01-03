import { GigType } from '../types/gigTypes';
import HttpException from '../utils/httpException';
import { sanitizeId } from './userSanitizer';

export function sanitizeGig(gig: GigType, userId: string | undefined): GigType {
    const sanitizedId = sanitizeId(userId);
    const sanitizedGig: GigType = {
        userId: sanitizedId,
        title: '',
    };

    sanitizedGig.title = sanitizeTitle(gig.title.toString());

    return sanitizedGig;
}

function sanitizeTitle(title: string): string {
    if (title === undefined) {
        throw new HttpException('Name undefined', 400);
    }
    if (title !== 'string') {
        throw new HttpException('Name is not a String', 400);
    }

    title = title.trim();
    if (title.length < 2) {
        throw new HttpException('Name must be at least 2 characters', 400);
    }
    if (title.length > 20) {
        throw new HttpException(
            'Name must not be more than 20 characters',
            400
        );
    }
    return title;
}
