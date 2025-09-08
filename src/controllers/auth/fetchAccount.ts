import { Request, Response } from "express";

const fetchAccountAPI = async (req: Request, res: Response) => {
  // Đọc header delay (nếu có)
  const delay = parseInt(req.headers["delay"] as string) || 0;

  // Thông tin user đã được gán vào req.user bởi checkValidJWT
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({
      errorCode: 1,
      message: "Không tìm thấy thông tin người dùng trong token",
      data: null,
    });
  }

  // Thêm delay trước khi trả response
  setTimeout(() => {
    return res.status(200).json({
      errorCode: 0,
      message: "Lấy thông tin người dùng thành công",
      data: {
        ...user,
      },
    });
  }, delay);
};

export { fetchAccountAPI };
