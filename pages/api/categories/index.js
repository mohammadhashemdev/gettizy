import { createRouter } from "next-connect";
import bodyParserMiddleware from "@/apiDependecies/middlewares/bodyParserMiddleware";
import Category from "@/apiDependecies/models/categoryModel";
import authenticate from "@/apiDependecies/middlewares/authenticationMiddleware";
import authorize from "@/apiDependecies/middlewares/authorizationMiddleware";
import connectDB from "@/apiDependecies/utils/mongoConnect";
import APIfeatures from "@/apiDependecies/utils/APIFeatures";

const router = createRouter();

router.use(bodyParserMiddleware);
router.use(authenticate);
router.use(authorize(["admin", "editor"]));

router.get(async (req, res) => {
  await connectDB();

  try {
    const features = new APIfeatures(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const categories = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        length: categories.length,
        categories,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
});

router.post(async (req, res) => {
  await connectDB();

  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newCategory,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Category already exists",
      });
    }
  }
});

router.delete(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "fail",
      message: "Access denied",
    });
  }

  await connectDB();

  try {
    await Category.deleteMany();

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
