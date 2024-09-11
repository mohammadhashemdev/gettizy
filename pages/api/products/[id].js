import { createRouter } from "next-connect";
import bodyParserMiddleware from "@/apiDependecies/middlewares/bodyParserMiddleware";
import Product from "@/apiDependecies/models/productModel";
import authenticate from "@/apiDependecies/middlewares/authenticationMiddleware";
import authorize from "@/apiDependecies/middlewares/authorizationMiddleware";
import connectDB from "@/apiDependecies/utils/mongoConnect";

const router = createRouter();

router.use(bodyParserMiddleware);
router.use(authenticate);
router.use(authorize(["admin", "editor"]));

router.get(async (req, res) => {
  const { id } = req.query;

  await connectDB();

  try {
    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: `Product not found with id: ${id}`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while getting product" });
  }
});

router.patch(async (req, res) => {
  const { id } = req.query;
  await connectDB();

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: `No product was found with the ID: ${id}.`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while creating product" });
  }
});

router.delete(async (req, res) => {
  if (req.user.role === "editor") {
    return res.status(403).json({
      status: "fail",
      message: "Access denied: Editors cannot delete any product",
    });
  }

  const { id } = req.query;

  await connectDB();

  try {
    await Product.findByIdAndDelete(id);
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
