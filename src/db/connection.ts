import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "../configs/config";

// Load environment variables from .env file
dotenv.config();

// const mongoUrl = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const mongoUrl = config.mongoUrl;
    if (!mongoUrl) {
      throw new Error("MongoDB URL is not defined in environment variables");
    }
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
