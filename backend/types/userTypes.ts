import { Schema } from 'mongoose';

export interface UserType {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    websites: Schema.Types.ObjectId[];
    resetPasswordToken: string;
    resetPasswordExpires: Date;
}

export interface UserSanitizerType {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface UserReturnType {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    token: string;
}
