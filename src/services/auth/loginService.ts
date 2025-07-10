import jwt from "jsonwebtoken";

const handleLogin = () => {
  const payload = {
    id: 1,
    name: "Nguyên Vũ",
  };
  const access_token = jwt.sign(payload, "hnv", {
    expiresIn: "1d",
  });

  return access_token;
};
export { handleLogin };
