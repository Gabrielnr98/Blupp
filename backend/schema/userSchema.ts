import { Schema } from "mongoose";
import { UserType } from "../types/userTypes";

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export interface IUserSchema extends UserType {
  _id: string;
}

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: [6, "Email must be at least 6 characters"],
      max: [50, "Email must be less than 50 characters"],
      match: [emailRegex, "Please add a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export default userSchema;
