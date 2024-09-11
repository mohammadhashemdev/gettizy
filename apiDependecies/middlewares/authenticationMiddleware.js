import User from "@/apiDependecies/models/userModel";
import connectDB from "../utils/mongoConnect";
import { getToken } from "next-auth/jwt";

const authenticate = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    await connectDB();
    const user = await User.findById(token.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error.message });
  }
};

export default authenticate;
