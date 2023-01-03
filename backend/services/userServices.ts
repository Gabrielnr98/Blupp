import { checkValidId } from "../database/db";
import UserModel from "../models/userModel";
import { sanitizeUser } from "../sanitizers/userSanitizer";
import { IUserSchema } from "../schema/userSchema";
import { UserType } from "../types/userTypes";

export async function getAllUsers(): Promise<UserType[]> {
  try {
    const users = await UserModel.find();
    if (!users) {
      throw new Error("No Users :(");
    }
    return users;
  } catch (err) {
    throw new Error(`Error Getting Users: ${err.message}`);
  }
}

export async function createUser(user: UserType): Promise<UserType> {
  sanitizeUser(user);
  try {
    const newUser = await UserModel.create(user);
    if (!newUser) {
      throw new Error("Error creating user");
    }
    return newUser;
  } catch (err) {
    throw new Error(`Error creating user: ${err.message}`);
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
    throw new Error(`Catch: ${err.message}`);
  }
}

export async function updateUser(
  id: string,
  user: UserType
): Promise<IUserSchema> {
  checkValidId(id);
  sanitizeUser(user);
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (err) {
    throw new Error(`Catch: ${err.message}`);
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
    throw new Error(`Catch: ${err.message}`);
  }
}
