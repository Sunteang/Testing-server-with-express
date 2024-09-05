import express, { Express } from "express";
import connectDB from "./db/connection";
import itemRoutes from "./routes/product";
import { logRequestTime } from "./middlewares/userLog";
import config from "./configs/config";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
// const port = process.env.PORT;
const port = config.port;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.use(express.json()); // Parse JSON bodies
    app.use(logRequestTime); // Log request time middleware
    app.use("/v1/items", itemRoutes); // CRUD routes for items

    // Global error handling middleware
    app.use(errorHandler); // Add global error handler as the last middleware

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

export default startServer;
