import mongoose, { Schema, Document } from "mongoose";

export interface ItemSchema extends Document {
  name: string;
  price: number;
  category: string;
  stock: number;
}

const itemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Item = mongoose.model<ItemSchema>("Products", itemSchema);

export default Item;
