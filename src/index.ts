// import express, { Request, Response, NextFunction } from "express";
// import { logRequestTime } from "./middleware/userLog";
// import Item from "./db/models/items";
// import connectDB from "./db/connection";

// const app = express();
// const port = 4000;

// // Connect to MongoDB
// connectDB();

// // Use the logRequestTime middleware globally
// app.use(logRequestTime);

// app.use(express.json());

// // GET all items
// app.get("/items", async (_req: Request, res: Response) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (error: any) {
//     res.status(500).json({ error: "Failed to fetch items" });
//   }
// });

// // GET single item by ID
// app.get("/items/:id", async (req: Request, res: Response) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (item) {
//       res.json(item);
//     } else {
//       res.status(404).json({ error: "Item not found" });
//     }
//   } catch (error: any) {
//     res.status(400).json({ error: "Invalid ID format" });
//   }
// });

// // POST create a new item
// app.post("/items", async (req: Request, res: Response) => {
//   const { name, description, price } = req.body;

//   // Basic validation
//   if (
//     typeof name !== "string" ||
//     typeof description !== "string" ||
//     typeof price !== "number"
//   ) {
//     return res.status(400).json({ error: "Missing or invalid fields" });
//   }

//   try {
//     const newItem = new Item({ name, description, price });
//     const savedItem = await newItem.save();
//     return res.status(201).json(savedItem);
//   } catch (error: any) {
//     return res.status(500).json({ error: "Failed to create item" });
//   }
// });

// // PUT update an item by ID
// app.put("/items/:id", async (req: Request, res: Response) => {
//   const { name, description, price } = req.body;

//   // Basic validation
//   if (
//     typeof name !== "string" ||
//     typeof description !== "string" ||
//     typeof price !== "number"
//   ) {
//     return res.status(400).json({ error: "Missing or invalid fields" });
//   }

//   try {
//     // Find the item by ID and update it
//     const updatedItem = await Item.findByIdAndUpdate(
//       req.params.id,
//       { name, description, price },
//       { new: true, runValidators: true }
//     );

//     if (!updatedItem) {
//       return res.status(404).json({ error: "Item not found" });
//     }

//     return res.json(updatedItem);
//   } catch (error: any) {
//     return res
//       .status(400)
//       .json({ error: "Invalid ID format or update failed" });
//   }
// });

// // DELETE an item by ID
// app.delete("/items/:id", async (req: Request, res: Response) => {
//   try {
//     const item = await Item.findByIdAndDelete(req.params.id);
//     if (item) {
//       res.json(item);
//     } else {
//       res.status(404).json({ error: "Item not found" });
//     }
//   } catch (error: any) {
//     res.status(400).json({ error: "Invalid ID format" });
//   }
// });

// // Start the server through to port 4000
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

import express from "express";

const app = express();
const port = 4000;

app.use(express.json());

// Sample in-memory data
let items = [
  { id: 1, name: "Item 1", description: "Description 1", price: 100 },
  { id: 2, name: "Item 2", description: "Description 2", price: 200 },
  { id: 3, name: "Item 3", description: "Description 3", price: 300 },
];

// GET all items
app.get("/items", (req, res) => {
  return res.json(items);
});

// GET a single item by ID
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Find the item with the matching id in the items array
  const item = items.find((item) => item.id === id);

  // If the item is not found, return 404
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  // If the item is found, return it as JSON
  return res.json(item);
});

// POST create a new item
app.post("/items", (req, res) => {
  const { name, description, price } = req.body;

  // Basic validation
  if (!name || !description || typeof price !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Create a new item with a unique ID
  const newItem = {
    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    name,
    description,
    price,
  };

  // Add the new item to the items array
  items.push(newItem);

  // Return the newly created item
  return res.status(201).json(newItem);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
