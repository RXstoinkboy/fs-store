import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./model.js";
import { CustomApiError } from "../../errors/custom-api-error.js";

const createJWT = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
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
    });

    const token = createJWT(createdUser._id);

    res.status(201).json({ message: "Success", token });
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

    const token = createJWT(user._id);

    res.status(200).json({
      message: "Success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {

  res.status(200).json({
    message: "Sign out",
  });
};
