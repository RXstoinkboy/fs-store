import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "woodika", "mebelki", "marcos"],
      message: "Company: \"{VALUE}\" does not exist",
    },
  }
});

export const COMPANIES = ["ikea", "woodika", "mebelki", "marcos"];
export const Product = mongoose.model("Product", ProductSchema);

