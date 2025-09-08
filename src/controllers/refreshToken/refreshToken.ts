import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "hnv-secret-003";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "hnv-refresh-secret-003";

export const refreshTokenAPI = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "Không có refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;

    // Tạo access_token mới
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, roleId: decoded.roleId },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      errorCode: 0,
      message: "Refresh thành công",
      access_token: newAccessToken,
    });
  } catch (err) {
    return res.status(403).json({ message: "Refresh token không hợp lệ" });
  }
};
