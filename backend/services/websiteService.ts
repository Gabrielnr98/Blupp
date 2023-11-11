import { checkIsValidObjectId } from '../database/db';
import WebsiteModel from '../models/websiteModel';
import { sanitizeWebsite } from '../sanitizers/websiteSanitizer';
import { IWebsiteSchema } from '../schema/websiteSchema';
import { WebsiteReturnType, WebsiteType } from '../types/websiteTypes';
import HttpException, { ErrorHandler } from '../utils/httpException';

export async function getWebsites(): Promise<WebsiteType[]> {
    try {
        const Websites = await WebsiteModel.find();

        return Websites;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function createWebsite(
    Website: WebsiteType
): Promise<WebsiteReturnType> {
    const sanitizedWebsite = await sanitizeWebsite(Website);

    try {
        const newWebsite = await WebsiteModel.create({
            name: sanitizedWebsite.name,
            email: sanitizedWebsite.email,
        });

        return {
            _id: newWebsite._id,
            name: newWebsite.name,
            email: newWebsite.email,
        };
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function getWebsiteById(
    websiteId: string
): Promise<IWebsiteSchema> {
    checkIsValidObjectId(websiteId);
    try {
        const Website = await WebsiteModel.findById(websiteId);
        if (Website == null) throw new HttpException('Website not found', 404);

        return Website;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function updateWebsite(
    websiteId: string,
    website: WebsiteType
): Promise<IWebsiteSchema> {
    checkIsValidObjectId(websiteId);

    const sanitizedWebsite = sanitizeWebsite(website);

    try {
        const updatedWebsite = await WebsiteModel.findByIdAndUpdate(
            websiteId,
            sanitizedWebsite,
            { new: true }
        );
        if (updatedWebsite == null)
            throw new HttpException('Website not found', 404);

        return updatedWebsite;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function deleteWebsite(WebsiteId: string): Promise<void> {
    checkIsValidObjectId(WebsiteId);

    try {
        const Website = await WebsiteModel.findByIdAndDelete(WebsiteId);
        if (Website == null) throw new HttpException('Website not found', 404);

        return;
    } catch (err) {
        throw ErrorHandler(err);
    }
}
