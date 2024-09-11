import { sign, verify } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export const generateToken = ({ id, username, email, role }) => {
  const payload = {
    id,
    username,
    email,
    role,
  };

  return sign(payload, secretKey, { expiresIn: process.env.JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
  try {
    return verify(token, secretKey);
  } catch (err) {
    return null;
  }
};
