import { Schema } from "mongoose";
import { GigType } from "../types/gigTypes";

export interface IGigSchema extends GigType {
  _id: string;
}

const gigSchema = new Schema<GigType>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default gigSchema;
