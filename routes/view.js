import express from "express";
import multer from "multer";
import { exam, subject } from "../Models/index.js";
import HttpStatusCode from "../Exception/HttpStatusCode.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/msword"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Chỉ cho phép tải lên các tệp tin định dạng .doc hoặc .docx"),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/", upload.single("fileExam"), async function (req, res) {
  if (!req.file) {
    res.status(400).json({ message: "Không có tệp tin được tải lên." });
    return;
  }
  try {
    await exam.create({
      idSubject: req.body.txtIdSubject,
      idExam: req.body.txtIdExam,
      nameExam: req.body.txtNameExam,
      result: req.body.txtResult,
      time: req.body.txtTime,
      file: req.file.originalname,
      quantity: req.body.txtQuantity,
    });
    res.status(200).json({ message: "Tệp tin tải lên thành công." });
  } catch (Exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      error: Exception.toString(),
    });
  }
});

async function getExam(req, res) {
  const exams = await exam.find({});
  return exams;
}
async function getSubject() {
  const subjects = await subject.find({});
  return subjects;
}
router.get("/", (req, res) => {
  getExam(req, res).then(async (foundExam) => {
    const subjects = await getSubject();
    if (!foundExam) {
      res.json({ Error: "Cannot get exam" });
    } else {
      res.render("examPage", { list: foundExam, subjectValue: subjects });
    }
  });
});
router.get("/delete/:id", async (req, res) => {
  await exam.findByIdAndDelete(req.params.id);

  res.redirect("../");
});
router.get("/update/:id", async (req, res) => {
  const existingExam = await exam.findById(req.params.id).exec();
  const allSubject = await getSubject();
  if (!existingExam) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: "Cannot find exam",
    });
  }
  res.render("updateExamPage", {
    myExam: existingExam,
    allSubject: allSubject,
  });
});
router.post("/update", upload.single("fileExam"), async function (req, res) {
  const myExam = await exam.findById(req.body.idEx).exec();
  if (!myExam) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: "Invalid exam",
    });
  }

  if (!req.file) {
    myExam.idSubject = req.body.txtIdSubject ?? myExam.idSubject;
    myExam.idExam = req.body.txtIdExam ?? myExam.idExam;
    myExam.nameExam = req.body.txtNameExam ?? myExam.nameExam;
    myExam.result = req.body.txtResult ?? myExam.result;
    myExam.time = req.body.txtTime ?? myExam.time;
    myExam.quantity = req.body.txtQuantity ?? myExam.quantity;
    await myExam.save();
  } else {
    myExam.idSubject = req.body.txtIdSubject ?? myExam.idSubject;
    myExam.idExam = req.body.txtIdExam ?? myExam.idExam;
    myExam.nameExam = req.body.txtNameExam ?? myExam.nameExam;
    myExam.result = req.body.txtResult ?? myExam.result;
    myExam.time = req.body.txtTime ?? myExam.time;
    myExam.file = req.file.originalname;
    myExam.quantity = req.body.txtQuantity ?? myExam.quantity;
    await myExam.save();
  }

  res.status(201).json({ message: "Update successfully" });
});
router.get("/json/:id", async (req, res) => {
  const existingExam = await exam.find({ idSubject: req.params.id });
  res.status(HttpStatusCode.OK).json({
    data: existingExam,
  });
});

router.get("/:id", async (req, res) => {
  const existingExam = await exam.findById(req.params.id).exec();
  res.status(HttpStatusCode.OK).json({
    data: existingExam,
  });
});
export default router;
