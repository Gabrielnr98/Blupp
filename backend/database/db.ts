import mongoose from "mongoose";
import { DB_URI } from "../utils/config";

export const connectDB = async () => {
    if (!DB_URI) {
        console.log('DB_URI not defined');
        process.exit();
    }
    try {
        await mongoose.connect(DB_URI);
        console.log('Connect do DB');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};