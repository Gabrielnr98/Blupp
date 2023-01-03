import { UserType } from "../types/userTypes";
import HttpException from "../utils/httpException";
import { emailRegex } from "../schema/userSchema";

export function sanitizeUser(user: UserType): UserType {
  let sanitizedUser = <UserType>{};

  sanitizedUser.name = sanitizeName(user.name.toString());
  sanitizedUser.surname = sanitizeName(user.surname.toString());
  sanitizedUser.email = sanitizeEmail(user.email.toString());
  sanitizedUser.isAdmin = sanitizeIsAdmin(user.isAdmin);
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
  return name;
}

function sanitizeIsAdmin(isAdmin: boolean): boolean {
  if (!isAdmin) isAdmin = false;

  return isAdmin;
}

function sanitizeEmail(email: string): string {
  if (email === undefined) {
    throw new HttpException("Email is undefined", 400);
  }
  if (typeof email !== "string") {
    throw new HttpException("Email is not a string", 400);
  }

  email = email.trim();

  if (email.length < 6) {
    throw new HttpException("Email must be at least 6 characters", 400);
  }
  if (email.length > 50) {
    throw new HttpException("Email must be less than 50 characters", 400);
  }
  if (email.length > 6) {
    throw new HttpException("Email must be at least 6 characters", 400);
  }
  if (!email.match(emailRegex)) {
    throw new HttpException("Please add a valid email", 400);
  }

  return email;
}
