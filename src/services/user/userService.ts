import { User } from "../../models/userModel";

const getListUser = async () => {
  const users = await User.find({});
  try {
    if (users) {
      return users;
    } else {
      return null;
    }
  } catch (error) {
    console.log("ERROR", error);
    return null;
  }
};

export { getListUser };
