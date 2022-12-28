import { checkValidId } from "../database/db";
import UserModel from "../models/userModel";
import { IUserSchema } from "../schema/userSchema";
import { UserType } from "../types/userModelTypes";

export async function getUsers(): Promise<UserType[]> {
  try {
    const users = await UserModel.find();
    if (!users) {
      throw new Error("No users :(");
    }
    return users;
  } catch (err) {
    throw new Error("Catch: Users not found");
  }
}

export async function createUser(user: UserType): Promise<UserType> {
  try {
    const newUser = await UserModel.create(user);
    if (!newUser) {
      throw new Error("Error creating user");
    }
    return newUser;
  } catch (err) {
    throw new Error("Catch: Error creating user");
  }
}

export async function getUser(id: string): Promise<IUserSchema> {
  checkValidId(id);
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw new Error("Catch: User not found");
  }
}

export async function updateUser(
  id: string,
  user: UserType
): Promise<IUserSchema> {
  checkValidId(id);
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (err) {
    throw new Error("Catch: User not found");
  }
}

export async function deleteUser(id: string): Promise<void> {
  checkValidId(id);
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
  } catch (err) {
    throw new Error("Catch: User not found");
  }
}
