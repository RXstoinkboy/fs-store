import express from "express";
import * as controller from "./controller.js";
import { ProfileSchema } from "./schemas.js";
import { requestValidation } from "../../middleware/request-validation.js";
import { authentication } from "../../middleware/authentication.js";

const router = express.Router();

router
  .route("/")
  .get(authentication('admin'), controller.getProfile)
  .post(
    requestValidation(ProfileSchema),
    authentication('user'),
    controller.createProfile
  );

router.route("/me").get(authentication(), controller.getProfile);

export default router;
