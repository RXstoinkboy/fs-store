import { CustomApiError } from "../errors/custom-api-error.js";
import mongoose from "mongoose";

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('error' ,err)
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json(err);
  }

  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ message });
};
