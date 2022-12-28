import { Request, Response } from "express";
import expressAsyncHandler = require("express-async-handler");
import UserModel from "../models/userModel";
const mongoose = require("mongoose");

//Get all Users
export const getUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).json({ users });
  }
);

//Create new User
export const createUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.surname || !req.body.email) {
      res.status(400);
      throw new Error("All filed must be filled");
    }

    const user = await UserModel.create(req.body);
    if (!user) {
      res.status(400);
      throw new Error("User was not created");
    }
    res.status(200).json({ user });
  }
);

//Get single User
export const getUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid ID");
    }
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ user });
  }
);

//Update User
export const updateUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.name && !req.body.surname && !req.body.email) {
      res.status(400);
      throw new Error("Commit at least one change");
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid ID");
    }
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ user });
  }
);

//Delete User
export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error("Invalid ID");
    }
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(200);
      throw new Error("user not found");
    }
    res.status(200).json({ message: `Delete ${req.params.id}` });
  }
);
