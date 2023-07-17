import { resultController } from "../controller/index.js";
import express from "express";
const router = express.Router();
router.post("/", resultController.postResult);
router.get("/exam/:id", resultController.getResultByIdExam);
router.get("/user/:id", resultController.getResultByIdUser);
export default router;
