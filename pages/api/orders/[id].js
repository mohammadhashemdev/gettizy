import { createRouter } from "next-connect";
import bodyParserMiddleware from "@/apiDependecies/middlewares/bodyParserMiddleware";
import Order from "@/apiDependecies/models/orderModel";
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
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: `Order not found with id: ${id}`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.patch(async (req, res) => {
  const { id } = req.query;
  await connectDB();

  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: `No order was found with the ID: ${id}.`,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while creating order" });
  }
});

router.delete(async (req, res) => {
  if (req.user.role === "editor") {
    return res.status(403).json({
      status: "fail",
      message: "Access denied",
    });
  }

  const { id } = req.query;

  await connectDB();

  try {
    const orderToDelete = await Order.findByIdAndDelete(id);

    if (!orderToDelete) {
      return res.status(404).json({
        status: "Failed",
        message: "No order found with that id",
      });
    }

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
