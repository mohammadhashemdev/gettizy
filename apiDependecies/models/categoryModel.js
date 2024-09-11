import { Schema, models, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category should have a name"],
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: Date.now,
  }
);

function makeLowerCase(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

CategorySchema.pre("save", function (next) {
  this.slug = makeLowerCase(this.name);
  next();
});

const Category = models.Category || model("Category", CategorySchema);
export default Category;
