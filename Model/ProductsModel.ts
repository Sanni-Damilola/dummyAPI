import mongoose from "mongoose";

// product type structure 
interface Iprod {
  title: string;
  desc: string;
  price: number;
  quantity: number;
  category: string;
  status: boolean;
}

// extends to mongoose documents
interface UserData extends Iprod, mongoose.Document {}

//product schema
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },

    price: {
      type: Number,
    },

    quantity: {
      type: Number,
    },

    category: {
      type: String,
    },

    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

// product model
export default mongoose.model<UserData>("products", ProductSchema);
