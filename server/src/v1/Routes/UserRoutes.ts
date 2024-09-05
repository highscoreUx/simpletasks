import { Router } from "express";
import { signUp } from "../controllers/userController";

const router = Router();

router.route("/signup").post(signUp);

export default router;
