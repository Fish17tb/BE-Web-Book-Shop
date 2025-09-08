import { Request, Response } from "express";
import { handleLogin } from "../../services/auth/loginService";

export const loginAPI = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await handleLogin(email, password);

    if (result.success) {
      res.cookie("refresh_token", result.refresh_token, {
        httpOnly: false, //  Không cho FE đọc
        secure: false, // true nếu chạy HTTPS
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      });
      return res.status(200).json({
        data: {
          access_token: result.access_token,
          payload: result.payload,
        },
      });
    } else {
      return res.status(401).json({ error: result.error });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUserAPI = (req: Request, res: Response) => {
  // chưa dùng đến
};
