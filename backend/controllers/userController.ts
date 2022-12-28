import { Request, Response } from "express";
import expressAsyncHandler = require("express-async-handler");
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../services/userServices";
import mongoose = require("mongoose");

//Get all Users
export const getUsersHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const users = await getUsers();
    res.status(200).json({ users });
  }
);

//Create new User
export const createUserHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.surname || !req.body.email) {
      res.status(400);
      throw new Error("All filed must be filled");
    }

    const user = await createUser(req.body);
    res.status(201).json(user);
  }
);

//Get single User
export const getUserHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await getUser(req.params.id);
    res.status(200).json(user);
  }
);

//Update User
export const updateUserHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.name && !req.body.surname && !req.body.email) {
      res.status(400);
      throw new Error("Commit at least one change");
    }
    const user = await updateUser(req.params.id, req.body);
    res.status(200).json(user);
  }
);

//Delete User
export const deleteUserHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    await deleteUser(req.params.id);
    res.status(200).json({ message: `Delete ${req.params.id}` });
  }
);
