import { Request, Response } from "express";
import { handleRegister } from "../../services/auth/registerService";

export const registerAPI = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const result = await handleRegister({ fullName, email, phone, password });

    if (result.success) {
      return res.status(201).json({
        message: "User registered successfully",
        data: {
          user: result.user,
        },
      });
    } else {
      return res.status(400).json({ error: result.error });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
