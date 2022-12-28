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
    const users = await getAllGigs();
    res.status(200).json({ users });
  }
);

//Create new User
export const createGigHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await createGig(req.body);
    res.status(201).json(user);
  }
);

//Get single User
export const getGigHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await getGig(req.params.id);
    res.status(200).json(user);
  }
);

//Update User
export const updateGigHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await updateGig(req.params.id, req.body);
    res.status(200).json(user);
  }
);

//Delete User
export const deleteGigHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    await deleteGig(req.params.id);
    res.status(200).json({ message: `Deleted ${req.params.id}` });
  }
);
