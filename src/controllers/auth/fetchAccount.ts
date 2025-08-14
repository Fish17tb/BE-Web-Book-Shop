import { Request, Response } from "express";
import { Role } from "../../models/roleModel";

const fetchAccountAPI = async (req: Request, res: Response) => {
  // Thông tin user đã được gán vào req.user bởi checkValidJWT
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({
      errorCode: 1,
      message: "Không tìm thấy thông tin người dùng trong token",
      data: null,
    });
  }

  // Lấy thông tin đầy đủ của role
  let roleInfo = null;
  try {
    if (user.roleId) {
      roleInfo = await Role.findById(user.roleId).lean();
    }
  } catch (err) {
    roleInfo = null;
  }

  return res.status(200).json({
    errorCode: 0,
    message: "Lấy thông tin người dùng thành công",
    data: {
      ...user,
      role: roleInfo,
    },
  });
};

export { fetchAccountAPI };
