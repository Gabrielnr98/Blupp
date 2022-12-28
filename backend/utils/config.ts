require('dotenv').config();

export const PORT = process.env.PORT || 6000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_URI = process.env.DB_URI || null;