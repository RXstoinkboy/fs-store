import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/connect.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/v1/test", (req, res) => {
  res.send("Hello world");
});

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
