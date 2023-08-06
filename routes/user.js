import express from "express";
import { userController } from "../controller/index.js";
const router = express.Router();
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/update", userController.update);
router.post("/check", userController.check);
export default router;
