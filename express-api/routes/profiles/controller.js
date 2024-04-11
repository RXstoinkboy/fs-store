import { Profile } from "./model.js";
import { CustomApiError } from "../../errors/custom-api-error.js";

export const getProfile = async (req, res, next) => {
  try {
    
    const profile = await Profile.findOne({ user: req.user.userId }).populate(
      "user",
      "email"
    );
    res.status(200).json({
      message: "Success",
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req, res, next) => {
  try {
    const isProfileExists = await Profile.exists({ user: req.user.userId });

    if (isProfileExists) {
      throw new CustomApiError("Profile already exists", 400);
    }
    const profile = await Profile.create({
      ...req.body,
      user: req.user.userId,
    });

    res.status(201).json({
      message: "Success",
      profile,
    });
  } catch (error) {
    next(error);
  }
};
