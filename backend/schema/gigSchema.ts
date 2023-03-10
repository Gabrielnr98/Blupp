import { Schema } from 'mongoose';
import { GigType } from '../types/gigTypes';

export interface IGigSchema extends GigType {
    _id: string;
}

const gigSchema = new Schema<GigType>(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default gigSchema;
