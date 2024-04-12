import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./model.js";
import { CustomApiError } from "../../errors/custom-api-error.js";
import { BlacklistedToken } from "./model.js";

const createJWT = (userId, role = "user") => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const signUp = async (req, res, next) => {
  try {
    const user = await User.exists({ email: req.body.email });

    if (user) {
      throw new CustomApiError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const createdUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    const token = createJWT(createdUser._id, createdUser.role);

    res.status(201).json({ message: "Success", token, role: createdUser.role });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new CustomApiError("Invalid credentials", 401);
    }

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isCorrectPassword) {
      throw new CustomApiError("Invalid credentials", 401);
    }

    const token = createJWT(user._id, user.role);

    res.status(200).json({
      message: "Success",
      token,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const [_, token] = req.headers.authorization.split(" "); // Assumes 'Bearer <token>' format

    // Add the token to the blacklist
    await new BlacklistedToken({ token }).save();

    res.status(200).json({
      message: "Sign out successful",
    });
  } catch (error) {
    next(error);
  }
};
