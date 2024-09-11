import { Schema, models, model } from "mongoose";

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Collection should have a name"],
    },
    description: {
      type: String,
      required: [true, "Collection should have a description"],
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    actualPrice: {
      type: Number,
      required: [true, "Collection should have an actual price"],
    },
    salesPrice: {
      type: Number,
      required: [true, "Collection should have a sales price"],
    },
    offerType: String,
    images: {
      slider: {
        type: [String],
        required: true,
      },
      bodyImage: {
        type: [String],
        required: true,
      },
    },
  },
  {
    timestamps: Date.now,
  }
);

const Collection = models.Collection || model("Collection", collectionSchema);
export default Collection;
