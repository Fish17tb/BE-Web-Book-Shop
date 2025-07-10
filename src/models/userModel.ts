import mongoose from "mongoose";
import { ACCOUNT_TYPE } from "../config/constant";

// shape data
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  avatar: String,
  accountType: {
    type: String,
    enum: Object.values(ACCOUNT_TYPE),
    // required: true,
  },
});

export const User = mongoose.model("User", userSchema);
