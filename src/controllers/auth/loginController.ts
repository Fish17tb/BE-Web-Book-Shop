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
      return res.status(200).json({ access_token: result.access_token });
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
