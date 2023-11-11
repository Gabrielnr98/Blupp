import { checkIsValidObjectId } from '../database/db';
import { emailRegex } from '../schema/userSchema';
import { WebsiteSanitizerType, WebsiteType } from '../types/websiteTypes';
import HttpException from '../utils/httpException';

export async function sanitizeWebsite(
    users: WebsiteType
): Promise<WebsiteSanitizerType> {
    const sanitizedUser: WebsiteSanitizerType = {
        name: '',
        email: '',
    };

    sanitizedUser.email = sanitizeEmail(users.email);
    sanitizedUser.name = sanitizeName(users.name);

    return sanitizedUser;
}

function sanitizeName(name: string): string {
    // Types
    if (name === undefined) {
        throw new HttpException('Username is undefined', 400);
    }
    if (typeof name !== 'string') {
        throw new HttpException('Username is not a string', 400);
    }

    // Attributes
    name = name.trim();

    return name;
}

function sanitizeEmail(email: string): string {
    // Types
    if (email === undefined) {
        throw new HttpException('Email is undefined', 400);
    }
    if (typeof email !== 'string') {
        throw new HttpException('Email is not a string', 400);
    }

    // Attributes
    email = email.trim();
    if (email.length < 6) {
        throw new HttpException('Email must be at least 6 characters', 400);
    }
    if (email.length > 50) {
        throw new HttpException('Email mut be less then 50 characters', 400);
    }
    if (email.match(emailRegex) == null) {
        throw new HttpException('Please add a valid email', 400);
    }

    return email;
}

export function sanitizeId(id: string | undefined): string {
    if (id === undefined) {
        throw new HttpException('UserId is undefined', 400);
    }
    checkIsValidObjectId(id);
    return id.valueOf();
}
