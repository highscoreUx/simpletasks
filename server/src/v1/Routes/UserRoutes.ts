import { Router } from "express";
import { login, logout, refresh, signUp } from "../controllers/userController";
import { limiter } from "../middlewares/LimitRate";

const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(limiter, login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);
router.route("/forgot-password").get();

export default router;
