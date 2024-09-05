import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Define and export configuration variables
const config = {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT,
};

if (!config.mongoUrl) {
  throw new Error(
    "MongoDB connection string is not defined in the environment variables."
  );
}

export default config;
