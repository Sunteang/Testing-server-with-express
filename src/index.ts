import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import * as yup from "yup";

const app: Express = express();
const port = 4000;

// MongoDB connection URL
const mongoUrl =
  "mongodb+srv://sereysunteang:pa$$word@cluster0.drkax.mongodb.net/Bookstore?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Global Middleware
app.use(express.json());

// Mongoose Schema and Model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Item = mongoose.model("Products", itemSchema);

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
    .then(() => next()) // Proceed to the next middleware if validation passes
    .catch((err) => res.status(400).json({ errors: err.errors }));
};

// GET all items
app.get("/v1/items", async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve items" });
  }
});

// GET a single item by ID
app.get("/v1/items/:id", async (req: Request, res: Response) => {
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
app.post("/v1/items", validateItem, async (req: Request, res: Response) => {
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
app.put("/v1/items/:id", validateItem, async (req: Request, res: Response) => {
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
