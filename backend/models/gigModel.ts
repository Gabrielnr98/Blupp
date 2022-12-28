import { model } from "mongoose";
import gigSchema, { IGigSchema } from "../schema/gigSchema";

const GigModel = model<IGigSchema>("Gig", gigSchema);

export default GigModel;
