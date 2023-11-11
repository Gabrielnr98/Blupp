import { NextFunction, Response, Request, RequestHandler } from 'express';
import { WebsiteReturnType } from '../types/websiteTypes'; // Import your Website model
import { UserReturnType } from '../types/userTypes';
import HttpException from '../utils/httpException';

import asyncHandler from 'express-async-handler';

interface MiddlewareOptions {
    action: string;
}

export interface AuthorizedUserRequest extends Request {
    user?: UserReturnType;
    website?: WebsiteReturnType;
}

export const authorizeWebsite = (options: MiddlewareOptions): RequestHandler =>
    asyncHandler(
        async (
            req: AuthorizedUserRequest,
            res: Response,
            next: NextFunction
        ) => {
            // Check if the user has the 'admin' role for the website or if it is an 'admin' of the framework
            if (
                req.user?.isAdmin ??
                req.website?.members.some(
                    (member) =>
                        member.user !== null &&
                        member.user === req.user?._id &&
                        member.role === 'admin'
                ) ??
                false
            ) {
                next();
                return;
            }
            // Check if the user is and editor
            if (
                options.action === 'update' &&
                (req.website?.members.some(
                    (member) =>
                        member.user !== null &&
                        member.user === req.user?._id &&
                        member.role === 'editor'
                ) ??
                    false)
            ) {
                next();
                return;
            }
            // Check if the user is at least a viewer
            if (
                options.action === 'view' &&
                (req.website?.members.some(
                    (member) =>
                        member.user !== null &&
                        member.user === req.user?._id &&
                        member.role === 'viewer'
                ) ??
                    false)
            ) {
                next();
                return;
            }
            // At this point, we can be sure the user is not a member
            throw new HttpException('Unauthorized', 401);
        }
    );
