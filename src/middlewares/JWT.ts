import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const checkValidJWT = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path

  // Danh sách không cần phải check quyền
  const whiteList = ["/login"];

  const isWhiteList = whiteList.some(route => route === path)
  // console.log("isWhiteList:", isWhiteList, path);
  if (isWhiteList) {
    next() // chạy sang controller
    return
  }

  const token = req.headers["authorization"]?.split(" ")[1];

  try {
    const dataDecoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("dataDecoded:", dataDecoded);
    (req as any).user = dataDecoded;
    next();
  } catch (error) {
    console.log("ERROR:", error.message);
    return res.status(401).json({
      data: null,
      errorSpecific: error.message,
      message: "Token không hợp lệ (không truyền lên token hoặc token hết hạn)",
    });
  }
};

export { checkValidJWT };
