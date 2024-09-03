// src/middleware.ts
import { Request, Response, NextFunction } from "express";

// Middleware function to log the request time
export const logRequestTime = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  console.log(`Request received at: ${new Date().toISOString()}`);
  next();
};
