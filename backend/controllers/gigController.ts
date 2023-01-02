import { Request, Response } from "express";
import expressAsyncHandler = require("express-async-handler");
import {
  getAllGigs,
  createGig,
  getGig,
  updateGig,
  deleteGig,
} from "../services/gigServices";

//Get all Users
export const getAllGigsHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const gigs = await getAllGigs();
    res.status(200).json({ gigs });
  }
);

//Create new User
export const createGigHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const gig = await createGig(req.body);
    res.status(201).json(gig);
  }
);

//Get single User
export const getGigHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const gig = await getGig(req.params.id);
    res.status(200).json(gig);
  }
);

//Update User
export const updateGigHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const gig = await updateGig(req.params.id, req.body);
    res.status(200).json(gig);
  }
);

//Delete User
export const deleteGigHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    await deleteGig(req.params.id);
    res.status(200).json({ message: `Deleted ${req.params.id}` });
  }
);
