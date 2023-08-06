import subject from "../Models/subject.js";
import { subjectController } from "../controller/index.js";
import express from "express";

const router = express.Router();
router.post("/", subjectController.addSubject);
router.post("/update", subjectController.updateSubject);
router.get("/", subjectController.getAllSubject);
router.get("/delete/:id", subjectController.deleteSubject);
router.get("/update/:id", subjectController.getSubject);
router.get("/json/:id", subjectController.getJsonSubjectByIdDepart);
export default router;
