import express from "express";

const app = express();
const port = 4000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use(express.json());

// Sample in-memory data
let items = [
  { id: 1, name: "Name 1", comment: "Comment 1" },
  { id: 2, name: "Name 2", comment: "Comment 2" },
  { id: 3, name: "Name 3", comment: "Comment 3" },
];

// GET all items
app.get("/items", (req, res) => {
  return res.json(items);
});

// // GET a single item by ID
// app.get("/items/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);

//   // Find the item with the matching id in the items array
//   const item = items.find((item) => item.id === id);

//   // If the item is not found, return 404
//   if (!item) {
//     return res.status(404).json({ error: "Item not found" });
//   }

//   // If the item is found, return it as JSON
//   return res.json(item);
// });

// POST create a new item
app.post("/items", (req, res) => {
  const { name, comment } = req.body;

  // Basic validation
  if (!name || !comment) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Create a new item with a unique ID
  const newItem = {
    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    name,
    comment,
  };

  // Add the new item to the items array
  items.push(newItem);

  // Return the newly created item
  return res.status(201).json(newItem);
});

// // PUT update an existing item by ID
// app.put("/items/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const { name, comment } = req.body;

//   const item = items.find((item) => item.id === id);

//   if (!item) {
//     return res.status(404).json({ error: "Item not found" });
//   }

//   if (!name || !comment) {
//     return res.status(400).json({ error: "Invalid input" });
//   }

//   item.name = name;
//   item.comment = comment;

//   // Return the updated item
//   return res.json(item);
// });

// PUT update an existing item by ID
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, comment } = req.body;

  const item = items.find((item) => item.id === id);
  console.log(item);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (!name || !comment) {
    return res.status(400).json({ error: "Invalid input" });
  }

  item.name = name;
  item.comment = comment;

  // Return the updated item
  return res.status(200).json(item);
});

// DELETE an item by ID
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  // Remove the item from the array
  const deletedItem = items.splice(itemIndex, 1)[0];

  return res.json(deletedItem);
});
