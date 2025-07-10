import { Request, Response } from "express";

const loginAPI = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {

  } catch (error) {
    return error
  }
};

const handleloginAPI = (req: Request, res: Response) => {
  
};

const createUserAPI = (req: Request, res: Response) => {};

export { loginAPI, handleloginAPI, createUserAPI };
