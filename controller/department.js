import { departmentRepositories } from "../repositories/index.js";
import HttpStatusCode from "../Exception/HttpStatusCode.js";
async function addDepartment(req, res) {
  try {
    let existingDepartment = await departmentRepositories.addDepartment({
      idDepartment: req.body.txtIdDepartment,
      nameDepartment: req.body.txtNameDepartment,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Add department successfully",
      data: existingDepartment,
    });
  } catch (Exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: Exception.toString(),
    });
  }
}

async function updateDepartment(req, res) {
  try {
    let existingDepartment = await departmentRepositories.updateDepartment({
      id: req.body.idDe,
      idDepartment: req.body.txtIdDepartment,
      nameDepartment: req.body.txtNameDepartment,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Update department successfully",
      data: existingDepartment,
    });
  } catch (Exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: Exception.toString(),
    });
  }
}
async function getDepartment(req, res) {
  try {
    const existingDepartment = await departmentRepositories.getDepartment({
      id: req.params.id,
    });
    res.render("updateDepartmentPage", { department: existingDepartment });
  } catch (Exception) {
    res
      .status(HttpStatusCode.INTERNAL_SEVER_EROR)
      .json({ error: Exception.toString() });
  }
}
async function getAllDepartment(req, res) {
  let getDepartment = await departmentRepositories.getAllDepartment(req, res);
  // res.status(HttpStatusCode.OK).json({ data: getDepartment });
  res.render("departmentPage", { list: getDepartment });
}
async function deleteDepartment(req, res) {
  try {
    await departmentRepositories.deleteDepartment({ id: req.params.id });
    res.status(HttpStatusCode.OK).json({ message: "Delete successfully" });
    // var delayInMilliseconds = 1000;
    // setTimeout(() => {}, delayInMilliseconds);
  } catch (Exception) {
    res
      .status(HttpStatusCode.INTERNAL_SEVER_EROR)
      .json({ message: Exception.toString() });
  }
}
export default {
  addDepartment,
  updateDepartment,
  getAllDepartment,
  deleteDepartment,
  getDepartment,
};
