import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError"; // Import the custom error class

// Global error handling middleware
const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is provided
  const message = err.message || "Internal Server Error";

  // Log the error (optional)
  console.error(`Error: ${message}`);

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Only show stack trace in development
  });
};

export default errorHandler;
