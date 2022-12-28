import { UserType } from "../types/userTypes";
import HttpException from "../utils/httpException";

export function sanitizeUser(user: UserType): UserType {
  let sanitizedUser = <UserType>{};

  sanitizedUser.name = sanitizeName(user.name.toString());
  sanitizedUser.surname = sanitizeName(user.surname.toString());

  return sanitizedUser;
}

function sanitizeName(name: string): string {
  if (name === undefined) {
    throw new HttpException("Name undefined", 400);
  }
  if (name !== "string") {
    throw new HttpException("Name is not a String", 400);
  }

  name = name.trim();
  if (name.length < 2) {
    throw new HttpException("Name must be at least 2 characters", 400);
  }
  if (name.length > 20) {
    throw new HttpException("Name must not be more than 20 characters", 400);
  }
  return name;
}
