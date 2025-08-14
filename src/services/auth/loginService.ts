import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../models/userModel";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "hnv-secret-003"; // tốt nhất nên để trong .env
const EXPIRES_IN: any = process.env.EXPIRES_IN;

export const handleLogin = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, error: "Email not found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: "Incorrect password" };
    }

    const payload = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      roleId: user.roleId,
    };

    const access_token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: EXPIRES_IN,
    });

    return { success: true, access_token };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error during login",
    };
  }
};
