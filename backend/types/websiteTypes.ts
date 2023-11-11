import { Types } from 'mongoose';

export interface WebsiteType {
    name: string;
    email: string;
    members: WebsiteMember[];
}

export interface WebsiteSanitizerType {
    name: string;
    email: string;
}

export interface WebsiteReturnType {
    _id: string;
    name: string;
    email: string;
    members: WebsiteMemberReturnType[];
}

export interface WebsiteMemberReturnType {
    user: string;
    role: string;
}

export interface WebsiteMember {
    user: Types.ObjectId;
    role: 'admin' | 'editor' | 'viewer';
}
