import mongoose from "mongoose";
import { DB_URI } from "../utils/config";
import HttpException from "../utils/httpException";

export const connectDB = async () => {
  mongoose.set("strictQuery", false);
  if (!DB_URI) {
    console.log("DB_URI not defined".red.underline.bold);
    process.exit();
  }
  try {
    await mongoose.connect(DB_URI);
    console.log("Connect do DB".blue.underline.bold);
  } catch (err) {
    console.log(err.message.red.underline.bold);
    process.exit(1);
  }
};

export function checkValidId(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpException("Invalid ID", 400);
  }
}
