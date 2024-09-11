import { createRouter } from "next-connect";
import bodyParserMiddleware from "@/apiDependecies/middlewares/bodyParserMiddleware";
import Order from "@/apiDependecies/models/orderModel";
import authenticate from "@/apiDependecies/middlewares/authenticationMiddleware";
import authorize from "@/apiDependecies/middlewares/authorizationMiddleware";
import connectDB from "@/apiDependecies/utils/mongoConnect";
import APIfeatures from "@/apiDependecies/utils/APIFeatures";

const router = createRouter();

router.use(bodyParserMiddleware);

router.post(async (req, res) => {
  await connectDB();

  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newOrder,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
});

router.use(authenticate);
router.use(authorize(["admin", "editor"]));

router.get(async (req, res) => {
  await connectDB();

  try {
    const features = new APIfeatures(Order.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const orders = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        length: orders.length,
        orders,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
});

router.delete(async (req, res) => {
  if (req.user.role === "editor") {
    return res.status(403).json({
      status: "fail",
      message: "Access denied: Editors cannot delete orders",
    });
  }

  await connectDB();

  try {
    await Order.deleteMany();

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
