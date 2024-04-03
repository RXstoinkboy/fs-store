import { connectToMongoDB } from "../db/connect.js";
import { Product } from "../routes/products/model.js";
import { products } from "./data.js";
import dotenv from "dotenv";

dotenv.config();

const seed = async () => {
  try {
    await connectToMongoDB();
    await Product.deleteMany();
    console.log("Seeding data");
    await Product.create(products);
    console.log("Seeding complete");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seed();