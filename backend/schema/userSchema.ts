import { Schema } from "mongoose";
import { UserType } from "../types/userModelTypes";

export interface IUserSchema extends UserType {
  _id: string;
}

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default userSchema;
