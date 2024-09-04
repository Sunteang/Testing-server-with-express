import mongoose, { Schema, Document } from "mongoose";

export interface Item extends Document {
  name: string;
  price: number;
  category: string;
  stock: number;
}
const modelSchema = () => {
  const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  });

  mongoose.model<Item>("Products", ItemSchema);
};
export default modelSchema;
