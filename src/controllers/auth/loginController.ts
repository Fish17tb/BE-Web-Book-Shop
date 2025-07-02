import { Request, Response } from "express";
const loginAPI = async (req: Request, res: Response) => {
  const { username, password } = req.body;
};

const handleloginAPI = (req: Request, res: Response) => {};

const createUserAPI = (req: Request, res: Response) => {};

export { loginAPI, handleloginAPI, createUserAPI };
