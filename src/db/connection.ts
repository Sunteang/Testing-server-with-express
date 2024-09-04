import mongoose from "mongoose";

const mongoUrl =
  "mongodb+srv://sereysunteang:pa$$word@cluster0.drkax.mongodb.net/ProductCatalog?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB Connected Error: ${error.message}`);
  }
};

export default connectDB;
