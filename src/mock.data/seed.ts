import { User } from "../models/userModel";
import { ACCOUNT_TYPE } from "../config/constant";

const initDataFake = async () => {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.insertMany([
      {
        fullName: "Phạm Minh Hoàng",
        email: "minhhoang789@gmail.com",
        passWord: "123456",
        accountType: ACCOUNT_TYPE.SYSTEM,
        phone: "0987123456",
      },
      {
        fullName: "Lê Thị Hồng Ánh",
        email: "honganh.le26@gmail.com",
        passWord: "123456",
        accountType: ACCOUNT_TYPE.SYSTEM,
        phone: "0978123981",
      },
      {
        fullName: "Trần Quốc Bảo",
        email: "quocbao.tran123@gmail.com",
        passWord: "123456",
        accountType: ACCOUNT_TYPE.SYSTEM,
        phone: "0969457821",
      },
      {
        fullName: "Nguyễn Thị Thanh Tâm",
        email: "tamthanh2410@gmail.com",
        passWord: "123456",
        accountType: ACCOUNT_TYPE.SYSTEM,
        phone: "0912378465",
      },
      {
        fullName: "Đặng Văn Khánh",
        email: "khanhdv789@gmail.com",
        passWord: "123456",
        accountType: ACCOUNT_TYPE.SYSTEM,
        phone: "0938765432",
      },
    ]);
  } else {
    console.log("Data already exists in the database");
  }
};

export default initDataFake;
