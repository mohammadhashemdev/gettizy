import { Schema, models, model } from "mongoose";

const projectSchema = new Schema(
  {
    country: {
      type: String,
      required: [true, "Project should have a country"],
    },
    domain: {
      type: String,
      required: [true, "Project should have a domain"],
    },
    socialMediaLinks: {
      type: String,
      required: [true, "Project should have social media links"],
    },
    phone: String,
    whatsapp: {
      type: String,
      required: [true, "Project should have whatsapp number"],
    },
    currency: String,
    email: {
      type: String,
      required: [true, "Project should have email"],
    },
  },
  {
    timestamps: Date.now,
  }
);

const Project = models.Project || model("Project", projectSchema);
export default Project;
