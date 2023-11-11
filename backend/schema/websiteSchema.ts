import { Schema } from 'mongoose';
import { WebsiteType } from '../types/websiteTypes';

// eslint-disable-next-line no-useless-escape
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export interface IWebsiteSchema extends WebsiteType {
    _id: string;
}

const websiteSchema = new Schema<WebsiteType>(
    {
        name: {
            type: String,
            required: [true, 'Name of the website is required'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            min: [6, 'Email must be at least 6 characters'],
            max: [50, 'Email must be less then 50 characters'],
            match: [emailRegex, 'Please add a valid email'],
        },
        members: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'Website',
                },
                role: {
                    type: String,
                    enum: ['admin', 'editor', 'viewer'],
                    default: 'viewer',
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default websiteSchema;
