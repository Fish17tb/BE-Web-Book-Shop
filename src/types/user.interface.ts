import { Document } from "mongoose";
import { ACCOUNT_TYPE } from "../config/constant";

export interface IUser extends Document {
  fullName: string;
  email: string;
  passWord: string;
  phone: string;
  address: string;
  avatar: string;
  accountType: keyof typeof ACCOUNT_TYPE;
}
