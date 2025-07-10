import bcrypt from "bcrypt";
import { User } from "../../models/userModel";

interface RegisterInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashing password:", password);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword, // Đảm bảo field đúng (viết hoa/viết thường đúng theo schema)
    });

    await newUser.save();

    return { success: true };
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
