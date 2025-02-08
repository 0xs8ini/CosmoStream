import { Router } from "express";
import {
  resigterUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(resigterUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

export default router;
