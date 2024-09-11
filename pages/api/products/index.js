import { createRouter } from "next-connect";
import bodyParserMiddleware from "@/apiDependecies/middlewares/bodyParserMiddleware";
import Product from "@/apiDependecies/models/productModel";
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
    const features = new APIfeatures(
      Product.find().populate("category"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const products = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        length: products.length,
        products,
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
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Product code already exists",
      });
    }
  }
});

router.delete(async (req, res) => {
  if (req.user.role === "editor") {
    return res.status(403).json({
      status: "fail",
      message: "Access denied: Editors cannot delete products",
    });
  }

  await connectDB();

  try {
    await Product.deleteMany();

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
