import mongoose from "mongoose";
import dotenv from "dotenv";

const mongoUrl =
  "mongodb+srv://sereysunteang:pa$$word@cluster0.drkax.mongodb.net/ProductCatalog?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
