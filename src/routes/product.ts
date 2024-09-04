import { Router, Request, Response, NextFunction } from "express";
import Item from "../models/model";
import * as yup from "yup";

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

// GET all items
productRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve items" });
  }
});

// GET a single item by ID
productRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (err) {
    return res.status(500).json({ error: "Failed to retrieve item" });
  }
});

// POST create a new item
productRouter.post("/", validateItem, async (req: Request, res: Response) => {
  const { name, price, category, stock } = req.body;

  try {
    const newItem = new Item({ name, price, category, stock });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

// PUT update an existing item by ID
productRouter.put("/:id", validateItem, async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, price, category, stock } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, price, category, stock },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(updatedItem);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update item" });
  }
});

// DELETE an item by ID
productRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    return res
      .status(200)
      .json({ message: "Item deleted successfully", item: deletedItem });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete item" });
  }
});

export default productRouter;
