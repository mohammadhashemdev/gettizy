import { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    profilePicture: {
      type: String,
    },
    designation: {
      type: String,
    },
    contact: {
      phone: Number,
      address: String,
    },
    lastEdited: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: Date.now,
  }
);

const UserProfile = models.UserProfile || model("UserProfile", ProfileSchema);
export default UserProfile;
