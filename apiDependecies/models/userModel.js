import { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
      type: String,
      index: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[0-9a-z_]+$/.test(value);
        },
        message:
          "Invalid username format. Please use numbers, lowercase letters, and underscores only.",
      },
    },
    userProfile: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "user"],
      default: "user",
    },
  },
  {
    timestamps: Date.now,
  }
);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

UserSchema.pre("save", function (next) {
  this.firstName = capitalize(this.firstName);
  this.lastName = capitalize(this.lastName);
  this.username = this.email.split("@")[0];
  next();
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePass,
  actualPass
) {
  return await bcrypt.compare(candidatePass, actualPass);
};

const User = models.User || model("User", UserSchema);
export default User;
