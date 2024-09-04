import express, { Express } from "express";
import connectDB from "../db/connection";

const app: Express = express();
const port = 4000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

export default startServer;
