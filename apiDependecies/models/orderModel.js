import { Schema, models, model } from "mongoose";

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    shippingAddress: {
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
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
    },
    quantity: Number,
    orderStatus: {
      type: String,
      enum: ["confirmed", "not answered", "cancelled", "pending"],
      default: "pending",
    },
    totalAmount: Number,
    currency: String,
    salesChannel: {
      type: String,
      enum: ["whatsapp", "landing-page"],
    },
    notes: String,
    taxes: {
      type: String,
    },
    fulfillmentStatus: {
      type: String,
      enum: ["pending", "picked up", "fulfilled", "returned"],
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "refunded"],
      default: "unpaid",
    },
    confirmDate: Date,
    deliveryDate: Date,
    cancelledDate: Date,
    returnedDate: Date,
    deliveryFee: {
      type: String,
      required: [true, "Orders should have a delivery fee"],
    },
  },
  {
    timestamps: Date.now,
  }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
