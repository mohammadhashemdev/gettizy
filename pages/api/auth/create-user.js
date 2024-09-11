import { createRouter } from "next-connect";
import bodyParserMiddleware from "@/apiDependecies/middlewares/bodyParserMiddleware";
import User from "@/apiDependecies/models/userModel";
import UserProfile from "@/apiDependecies/models/userProfileModel";
import connectDB from "../../../apiDependecies/utils/mongoConnect";
import authenticate from "@/apiDependecies/middlewares/authenticationMiddleware";
import authorize from "@/apiDependecies/middlewares/authorizationMiddleware";

const router = createRouter();

router.use(bodyParserMiddleware);
router.use(authenticate);
router.use(authorize(["admin", "editor"]));

router.post(async (req, res) => {
  await connectDB();

  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email format",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(401).json({
        status: "Failed",
        message: "Access denied!",
      });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    const userProfile = await UserProfile.create({ userId: newUser._id });

    await User.updateOne(
      { _id: newUser._id },
      { userProfile: userProfile._id }
    );

    return res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }
    return res.status(400).json({
      status: "fail",
      message: "An error occurred",
    });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ error: err.message });
  },
});
