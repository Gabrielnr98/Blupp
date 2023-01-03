import { checkIsValidObjectId } from "../database/db";
import GigModel from "../models/gigModel";
import { sanitizeGig } from "../sanitizers/gigSanitizer";
import { IGigSchema } from "../schema/gigSchema";
import { GigType } from "../types/gigTypes";

export async function getAllGigs(): Promise<GigType[]> {
  try {
    const gigs = await GigModel.find();
    if (!gigs) {
      throw new Error("No Gigs :(");
    }
    return gigs;
  } catch (err) {
    throw new Error("Catch: Gigs not found");
  }
}

export async function createGig(gig: GigType): Promise<GigType> {
  sanitizeGig(gig);
  try {
    const newGig = await GigModel.create(gig);
    if (!newGig) {
      throw new Error("Error creating gig");
    }
    return newGig;
  } catch (err) {
    throw new Error("Catch: Error creating gig");
  }
}

export async function getGig(id: string): Promise<IGigSchema> {
  checkIsValidObjectId(id);
  try {
    const gig = await GigModel.findById(id);
    if (!gig) {
      throw new Error("Gig not found");
    }
    return gig;
  } catch (err) {
    throw new Error("Catch: Gig not found");
  }
}

export async function updateGig(id: string, gig: GigType): Promise<IGigSchema> {
  checkIsValidObjectId(id);
  sanitizeGig(gig);
  try {
    const updatedGig = await GigModel.findByIdAndUpdate(id, gig, {
      new: true,
    });
    if (!updatedGig) {
      throw new Error("Gig not found");
    }
    return updatedGig;
  } catch (err) {
    throw new Error("Catch: Gig not found");
  }
}

export async function deleteGig(id: string): Promise<void> {
  checkIsValidObjectId(id);
  try {
    const gig = await GigModel.findByIdAndDelete(id);
    if (!gig) {
      throw new Error("Gig not found");
    }
  } catch (err) {
    throw new Error("Catch: Gig not found");
  }
}
