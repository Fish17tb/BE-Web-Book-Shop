import { ACCOUNT_TYPE } from "config/constant";
import { Request, Response } from "express";
import { User } from "models/User";

const createUSerAPI = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, phone, address, avatar, accountType } =
      req.body;

    // 1. Kiểm tra trường bắt buộc
    if (
      !fullName ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !accountType
    ) {
      return res.status(400).json({
        errorCode: 1,
        message: "Missing required fields",
      });
    }

    // 2. Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        errorCode: 2,
        message: "Invalid email format",
      });
    }

    // 3. Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return res.status(400).json({
        errorCode: 3,
        message: "Password must be at least 6 characters",
      });
    }

    // 4. Kiểm tra số điện thoại là số và có độ dài hợp lệ
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        errorCode: 4,
        message: "Invalid phone number format",
      });
    }

    // 5. Kiểm tra accountType có nằm trong danh sách hợp lệ
    if (!Object.values(ACCOUNT_TYPE).includes(accountType)) {
      return res.status(400).json({
        errorCode: 5,
        message: "Invalid account type",
      });
    }

    // 6. Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        errorCode: 6,
        message: "Email already exists",
      });
    }

    // 7. Tạo user mới
    const newUser = await User.create({
      fullName,
      email,
      password,
      phone,
      address,
      avatar,
      accountType,
    });

    return res.status(201).json({
      errorCode: 0,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({
      errorCode: 500,
      message: "Internal server error",
    });
  }
};

export { createUSerAPI };
