import { Router, Request, Response, NextFunction } from "express";
import Item from "../models/model";
import * as yup from "yup";
import AppError from "../utils/appError"; // Import the custom error class

const productRouter = Router();

// Yup Validation Schema
const itemValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .positive("Price must be positive")
    .required("Price is required"),
  category: yup.string().required("Category is required"),
  stock: yup
    .number()
    .integer()
    .positive("Stock must be a positive integer")
    .required("Stock is required"),
});

// Middleware for validating input
const validateItem = (req: Request, res: Response, next: NextFunction) => {
  itemValidationSchema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((err) => res.status(400).json({ errors: err.errors }));
};

// GET all items with pagination, filtering, and sorting
productRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const category = req.query.category as string;
      const sortBy = (req.query.sortBy as string) || "price";
      const sortOrder = req.query.order === "desc" ? -1 : 1;

      const filter = category ? { category } : {};
      const skip = (page - 1) * limit;

      const items = await Item.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit);
      const totalItems = await Item.countDocuments(filter);

      res.status(200).json({
        items,
        pagination: {
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
          limit,
        },
      });
    } catch (err) {
      next(err); // Pass error to global error handler
    }
  }
);

// GET a single item by ID
productRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const item = await Item.findById(id);
      if (!item) {
        return next(new AppError("Item not found", 404)); // Use custom error class
      }
      return res.status(200).json(item);
    } catch (err) {
      next(err); // Pass error to global error handler
    }
  }
);

// POST create a new item
productRouter.post(
  "/",
  validateItem,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, price, category, stock } = req.body;
      const newItem = new Item({ name, price, category, stock });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      next(err); // Pass error to global error handler
    }
  }
);

// PUT update an existing item by ID
productRouter.put(
  "/:id",
  validateItem,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { name, price, category, stock } = req.body;

    try {
      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { name, price, category, stock },
        { new: true, runValidators: true }
      );

      if (!updatedItem) {
        return next(new AppError("Item not found", 404)); // Use custom error class
      }

      return res.status(200).json(updatedItem);
    } catch (err) {
      next(err); // Pass error to global error handler
    }
  }
);

// DELETE an item by ID
productRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const deletedItem = await Item.findByIdAndDelete(id);
      if (!deletedItem) {
        return next(new AppError("Item not found", 404)); // Use custom error class
      }
      return res
        .status(200)
        .json({ message: "Item deleted successfully", item: deletedItem });
    } catch (err) {
      next(err); // Pass error to global error handler
    }
  }
);

export default productRouter;
