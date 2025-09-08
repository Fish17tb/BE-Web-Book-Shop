import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../models/userModel";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "hnv-secret-003"; // tốt nhất nên để trong .env
const EXPIRES_IN: any = process.env.EXPIRES_IN || "15m";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "hnv-refresh-secret-003"; // secret khác cho refresh
const REFRESH_EXPIRES_IN: any = process.env.REFRESH_EXPIRES_IN || "7d"; // refresh_token

export const handleLogin = async (email: string, password: string) => {
  try {
    // method populate: thay vì bạn chỉ có ID,
    // populate giúp bạn lấy ra thông tin chi tiết từ collection được tham chiếu.
    const user = await User.findOne({ email }).populate("roleId", "name -_id");
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

    const refresh_token = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRES_IN,
    });

    return { success: true, access_token, refresh_token, payload };
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
