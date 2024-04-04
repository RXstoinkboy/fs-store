import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { connectToMongoDB } from "./db/connect.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";
import productsModule from "./routes/products/module.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/v1/test", (req, res) => {
  res.send("Hello world");
});

app.use('/api/v1/products', productsModule);

app.use(errorHandlerMiddleware);
app.use(notFound);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

start();
