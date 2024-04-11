import { CustomApiError } from "../errors/custom-api-error.js";
import jwt from 'jsonwebtoken';

export const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new CustomApiError("Unauthorized", 401);
  }

  const [bearer, token] = req.headers.authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw new CustomApiError("Unauthorized", 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new CustomApiError("Unauthorized", 401);
    }
    req.user = decoded;
  })

  next();
};
