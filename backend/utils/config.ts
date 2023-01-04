import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT ?? 6000;
export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const DB_URI = process.env.DB_URI ?? null;
export const JWT_SECRET = process.env.JWT_SECRET ?? '';
export const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000';
