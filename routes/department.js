import express from "express";
import { departmentController } from "../controller/index.js";
const router = express.Router();
router.post("/", departmentController.addDepartment);
router.post("/update", departmentController.updateDepartment);
router.get("/", departmentController.getAllDepartment);
router.get("/delete/:id", departmentController.deleteDepartment);
router.get("/update/:id", departmentController.getDepartment);
export default router;
