import { userRepositories, resultRepositories } from "../repositories/index.js";
import HttpStatusCode from "../Exception/HttpStatusCode.js";
import user from "../Models/user.js";
import exam from "../Models/exam.js";
async function login(req, res) {
  try {
    let existingUser = await userRepositories.login(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "Login Sucessfully",
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: exception.toString(),
    });
  }
}
async function register(req, res) {
  try {
    let existingUser = await userRepositories.register(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Register Sucessfully",
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: exception.toString(),
    });
  }
}
async function update(req, res) {
  try {
    let existingUser = await userRepositories.update(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Update Sucessfully",
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: exception.toString(),
    });
  }
}
async function check(req, res) {
  try {
    let existingUser = await userRepositories.check(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "Ok",
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
      message: exception.toString(),
    });
  }
}
async function getExam(idExams) {
  let listExam;
  await Promise.all(idExams.map((value) => exam.findById(value).exec())).then(
    (e) => {
      listExam = [].concat(...e);
    }
  );
  return listExam;
}
async function viewResultByIdUser(req, res) {
  const existingResult = await resultRepositories.getResultByIdUser({
    idUser: req.params.id,
  });
  const listExam = await exam.find({});
  const student = await user.findById(req.params.id);

  res.render("userResultPage", {
    results: existingResult,
    student: student,
    listExam: listExam,
  });
}

async function getAllUser(req, res) {
  let existingUser = await userRepositories.getAllUser();
  res.render("userPage", { users: existingUser });
}
export default {
  login,
  register,
  update,
  check,
  getAllUser,
  viewResultByIdUser,
};
