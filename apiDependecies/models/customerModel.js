import { Schema, models, model } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "First name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      firstAddress: {
        type: String,
        required: [true, "Address is required"],
      },
      street: {
        type: String,
        required: [true, "Street is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    purchasedAmount: {
      type: Number,
      required: [true, "Purchased amount is required"],
    },
  },
  {
    timestamps: Date.now,
  }
);

const Customer = models.Customer || model("Customer", customerSchema);
export default Customer;
