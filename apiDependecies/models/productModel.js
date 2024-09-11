import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Product should have a code"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Product should have a name"],
    },
    description: {
      type: String,
      required: [true, "Product should have a description"],
      minLength: [10, "Description must be at least 10 characters"],
      maxLength: [500, "Description must be less than 500 characters"],
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    quantity: Number,
    discount: Number,
    color: {
      type: String,
      required: [true, "Product should have a color"],
    },
    sliderImages: [String],
    bodyImages: [String],
    actualPrice: {
      type: Number,
      required: [true, "Product should have an actual price"],
    },
    salePrice: {
      type: Number,
      required: [true, "Product should have a sale price"],
    },
    manDate: Date,
    expDate: Date,
    sold: Boolean,
    supplier: String,
  },
  {
    timestamps: Date.now,
  }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
