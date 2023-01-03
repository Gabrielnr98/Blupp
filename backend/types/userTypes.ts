export interface UserType {
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}

export interface UserReturnType {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  token: string;
}
