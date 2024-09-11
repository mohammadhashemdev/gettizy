import { Schema, model, models } from "mongoose";

const landingPageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    images: {
      slider: {
        type: [String],
        required: [true, "Project images (slider) are required"],
      },
      bodyImage: {
        type: [String],
        required: [true, "Project images (body-image) are required"],
      },
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    salesType: {
      type: String,
      enum: ["single", "collection"],
      required: [true, "Sales type is required"],
    },
    discount: {
      type: Number,
    },
    salesPrice: {
      type: Number,
      required: [true, "Sales price is required"],
    },
    actualPrice: {
      type: Number,
      required: [true, "Actual price is required"],
    },
    related: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    boughtTogether: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    project: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    url: {
      type: String,
      required: [true, "url for landing page is required"],
    },
    uiColor: {
      type: String,
      required: [true, "UI color is required"],
    },
  },
  {
    timestamps: Date.now,
  }
);

const LandingPage =
  models.LandingPage || model("LandingPage", landingPageSchema);

export default LandingPage;
