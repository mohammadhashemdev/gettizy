import Customer from "@/apiDependecies/models/customerModel";
import connectDB from "@/apiDependecies/utils/mongoConnect";
import authenticate from "@/apiDependecies/middlewares/authenticationMiddleware";
import authorize from "@/apiDependecies/middlewares/authorizationMiddleware";

const handler = async (req, res) => {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "GET":
      try {
        const customers = await Customer.find();
        res.status(200).json({
          status: "success",
          length: customers.length,
          data: {
            customers,
          },
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Server error while fetching customers" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default function (req, res) {
  return authenticate(req, res, () =>
    authorize(["admin", "editor"])(req, res, () => handler(req, res))
  );
}
