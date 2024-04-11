import express from "express";
import * as controller from "./controller.js";
import { AuthSchema } from "./schemas.js";
import { requestValidation } from "../../middleware/request-validation.js";

const router = express.Router();

router.route("/sign-up").post(requestValidation(AuthSchema), controller.signUp)
router.route("/sign-in").post(requestValidation(AuthSchema), controller.signIn)
router.route("/sign-out").post(controller.signOut)

export default router
