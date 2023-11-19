import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./config.js";

const CreateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "5h",
  });
};

const VerifyToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, JWT_SECRET_KEY);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

export { CreateToken, VerifyToken };
