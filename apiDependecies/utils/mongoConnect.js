import mongoose from "mongoose";

const connectionString = process.env.DB.replace(
  "<password>",
  process.env.PASSWORD
);

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("database connection successfully...");

    // connection.on("connected", () => {
    //   console.log("database connection successfully...");
    // });

    // connection.on("error", (error) => {
    //   console.log(
    //     "MongoDB connection error happened, please make sure MongoDB is running: ",
    //     +error
    //   );
    //   process.exit();
    // });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
};

export default connectDB;
