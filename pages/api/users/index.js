import { createRouter } from "next-connect";
import bodyParserMiddleware from "@/apiDependecies/middlewares/bodyParserMiddleware";
import authenticate from "@/apiDependecies/middlewares/authenticationMiddleware";
import authorize from "@/apiDependecies/middlewares/authorizationMiddleware";
import APIfeatures from "@/apiDependecies/utils/APIFeatures";
import User from "@/apiDependecies/models/userModel";
import UserProfile from "@/apiDependecies/models/userProfileModel";
import connectDB from "@/apiDependecies/utils/mongoConnect";

const router = createRouter();

router.use(bodyParserMiddleware);
router.use(authenticate);
router.use(authorize(["admin"]));

router.get(async (req, res) => {
  await connectDB();

  try {
    const features = new APIfeatures(
      User.find().populate("userProfile"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const users = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        length: users.length,
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
});

router.delete(async (req, res) => {
  await connectDB();

  try {
    await User.deleteMany();

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ error: err.message });
  },
});
