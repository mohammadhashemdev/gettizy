import connectDB from "@/apiDependecies/utils/mongoConnect";
import User from "@/apiDependecies/models/userModel";
import { generateToken } from "@/apiDependecies/utils/auth";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res
          .status(401)
          .json({ status: "falied", message: "Invalid email or password" });
      }

      const isMatch = await user.comparePassword(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ status: "failed", message: "Invalid email or password" });
      }

      const token = generateToken(user);

      res.status(200).json({
        status: "success",
        token,
        data: {
          user,
        },
      });
    } catch (error) {
      res.status(500).json({ status: "failed", message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
