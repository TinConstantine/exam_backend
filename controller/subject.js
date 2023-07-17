import HttpStatusCode from "../Exception/HttpStatusCode.js";
import { subjectRepositories } from "../repositories/index.js";
import { department } from "../Models/index.js";
async function addSubject(req, res) {
  try {
    let existingSubject = await subjectRepositories.addSubject({
      idDepartment: req.body.txtIdDepartment,
      idSubject: req.body.txtIdSubject,
      nameSubject: req.body.txtNameSubject,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Add subject sucessfully",
      data: existingSubject,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      error: exception.toString(),
    });
  }
}
async function updateSubject(req, res) {
  try {
    let existingSubject = await subjectRepositories.updateSubject({
      id: req.body.idSub,
      idDepartment: req.body.txtIdDepartment,
      idSubject: req.body.txtIdSubject,
      nameSubject: req.body.txtNameSubject,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Update subject sucessfully",
      data: existingSubject,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      error: exception.toString(),
    });
  }
}
async function getDepartment() {
  const allDepartment = await department.find({});
  return allDepartment;
}
async function getAllSubject(req, res) {
  let getSubject = await subjectRepositories.getAllSubject();
  const allDepartment = await getDepartment();
  res.render("subjectPage", {
    subjects: getSubject,
    allDepartment: allDepartment,
  });
}
async function deleteSubject(req, res) {
  try {
    await subjectRepositories.deleteSubject({ id: req.params.id });
    res.status(HttpStatusCode.OK).json({ message: "Delete successfully" });
  } catch (Exception) {
    res
      .status(HttpStatusCode.INTERNAL_SEVER_EROR)
      .json({ message: Exception.toString() });
  }
}
async function getSubject(req, res) {
  try {
    const existingSubject = await subjectRepositories.getSubject({
      id: req.params.id,
    });
    const allDepartment = await getDepartment();
    res.render("updateSubjectPage", {
      subject: existingSubject,
      departments: allDepartment,
    });
  } catch (Exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: Exception.toString(),
    });
  }
}
export default {
  addSubject,
  updateSubject,
  getAllSubject,
  deleteSubject,
  getSubject,
};
