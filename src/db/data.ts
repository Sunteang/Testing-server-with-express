// src/db/fakeDatabase.ts

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const Database: Item[] = [
  {
    id: 1,
    name: "Laptop",
    description: "A high-performance laptop",
    price: 1200,
  },
  {
    id: 2,
    name: "Smartphone",
    description: "A smartphone with a great camera",
    price: 800,
  },
  {
    id: 3,
    name: "Headphones",
    description: "Noise-cancelling headphones",
    price: 200,
  },
  {
    id: 4,
    name: "Smartwatch",
    description: "A smartwatch with health tracking features",
    price: 250,
  },
  {
    id: 5,
    name: "Tablet",
    description: "A lightweight tablet with a sharp display",
    price: 500,
  },
];
