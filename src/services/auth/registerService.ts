import bcrypt from "bcrypt";
import { User } from "../../models/userModel";
import { Role } from "../../models/roleModel";

interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const saltRounds = 10; // Password strength

export const handleRegister = async ({
  fullName,
  email,
  phone,
  password,
}: RegisterInput) => {
  try {
    // Validate input rõ ràng
    if (!fullName || !email || !phone || !password) {
      return { success: false, error: "Missing required fields" };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: "Email already exists" };
    }

    // Lấy role mặc định là USER
    const userRole = await Role.findOne({ name: "USER" });
    if (!userRole) {
      return { success: false, error: "Default role USER not found" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      roleId: userRole._id, // Gán roleId là _id của role USER
    });

    await newUser.save();

    // Lấy lại user mới tạo và populate roleId
    const populatedUser = await User.findById(newUser._id).populate("roleId");

    return { success: true, user:populatedUser };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while creating user",
    };
  }
};

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export { hashPassword };
