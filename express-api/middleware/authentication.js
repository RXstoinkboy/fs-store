import { CustomApiError } from "../errors/custom-api-error.js";
import jwt from "jsonwebtoken";
import { BlacklistedToken } from "../routes/auth/model.js";

export const authentication = (requiredRole) => async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new CustomApiError("Unauthorized", 401);
  }

  const [bearer, token] = req.headers.authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw new CustomApiError("Unauthorized", 401);
  }

  // this should better be stored in Redis or some other in-memory store
  const isBlacklisted = await BlacklistedToken.exists({ token });

  if (isBlacklisted) {
    throw new CustomApiError("Unauthorized", 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new CustomApiError("Unauthorized", 401);
    }

    if (
      requiredRole &&
      requiredRole !== decoded.role &&
      decoded.role !== "admin"
    ) {
      throw new CustomApiError("Unauthorized bo nie admin", 401);
    }
    req.user = decoded;
  });

  next();
};
