import { createRouter } from "next-connect";
import bodyParserMiddleware from "@/apiDependecies/middlewares/bodyParserMiddleware";
import User from "@/apiDependecies/models/userModel";
import authenticate from "@/apiDependecies/middlewares/authenticationMiddleware";
import authorize from "@/apiDependecies/middlewares/authorizationMiddleware";
import connectDB from "@/apiDependecies/utils/mongoConnect";
import UserProfile from "@/apiDependecies/models/userProfileModel";

const router = createRouter();

router.use(bodyParserMiddleware);
router.use(authenticate);
router.use(authorize(["admin", "editors", "users"]));

router.get(async (req, res) => {
  const { id } = req.query;

  await connectDB();

  try {
    const user = await User.findById(id).populate("userProfile");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: `User not found with id: ${id}`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while getting product" });
  }
});

router.patch(async (req, res) => {
  await connectDB();

  try {
    const { id } = req.query;

    const {
      firstName,
      lastName,
      email,
      role,
      username,
      profilePicture,
      designation,
      contact,
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: `No user found with id: ${id}`,
      });
    }

    const userProfile = await UserProfile.findById(user.userProfile);

    if (!userProfile) {
      return res.status(404).json({
        status: "fail",
        message: `No user profile found with id: ${id}`,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, role, username },
      {
        new: true,
        runValidators: true,
      }
    );

    const updatedUserProfile = await UserProfile.findByIdAndUpdate(
      updatedUser.userProfile,
      { profilePicture, designation, contact },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        updatedUser,
        updatedUserProfile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while creating user" });
  }
});

router.delete(async (req, res) => {
  const { id } = req.query;

  await connectDB();

  try {
    await User.findByIdAndDelete(id);

    await UserProfile.findOneAndDelete({ userId: id });

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while deleting products" });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ error: err.message });
  },
});
