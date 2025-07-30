import { User } from "../models/userModel";
import { ACCOUNT_TYPE } from "../config/constant";
import { Role } from "../models/roleModel";
import { hashPassword } from "../services/auth/registerService";

const initDataFake = async () => {
  const userCount = await User.countDocuments();
  const roleCount = await Role.countDocuments();

  if (roleCount === 0) {
    await Role.insertMany([
      {
        name: "ADMIN",
        description: "Admin thì full quyền",
      },
      {
        name: "USER",
        description: "User quyền thông thường",
      },
    ]);
  }

  if (userCount === 0) {
    const defaultPassword = await hashPassword("123456");
    const roleUser = await Role.findOne({ name: "ADMIN" });
    if (roleUser) {
      await User.insertMany([
        {
          fullName: "Phạm Minh Hoàng",
          email: "minhhoang789@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
          phone: "0987123456",
          roleId: roleUser.id,
        },
        {
          fullName: "Lê Thị Hồng Ánh",
          email: "honganh.le26@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
          phone: "0978123981",
          roleId: roleUser.id,
        },
        {
          fullName: "Trần Quốc Bảo",
          email: "quocbao.tran123@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
          phone: "0969457821",
          roleId: roleUser.id,
        },
        {
          fullName: "Nguyễn Thị Thanh Tâm",
          email: "tamthanh2410@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
          phone: "0912378465",
          roleId: roleUser.id,
        },
        {
          fullName: "Đặng Văn Khánh",
          email: "khanhdv789@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
          phone: "0938765432",
          roleId: roleUser.id,
        },
      ]);
    }
  }

  if (roleCount !== 0 && userCount !== 0) {
    console.log("Data already exists in the database");
  }
};

export default initDataFake;
