import HttpStatusCode from "../Exception/HttpStatusCode.js";
import { resultRepositories } from "../repositories/index.js";
async function postResult(req, res) {
  try {
    const finalResult = await resultRepositories.postResult(req.body);
    res
      .status(HttpStatusCode.INSERT_OK)
      .json({ message: "Successfully", data: finalResult });
  } catch (Exception) {
    res
      .status(HttpStatusCode.INTERNAL_SEVER_EROR)
      .json({ message: Exception.toString() });
  }
}

async function getResultByIdExam(req, res) {
  try {
    console.log(req.params.id);
    var id = req.params.id.toString();
    const existingExam = await resultRepositories.getResultByIdExam({
      idExam: req.params.id,
    });
    res
      .status(HttpStatusCode.OK)
      .json({ message: "Successfully", data: existingExam });
  } catch (Exception) {
    res
      .status(HttpStatusCode.INTERNAL_SEVER_EROR)
      .json({ message: Exception.toString() });
  }
}

async function getResultByIdUser(req, res) {
  try {
    console.log(req.params.id);
    const existingUser = await resultRepositories.getResultByIdUser({
      idUser: req.params.id,
    });
    res
      .status(HttpStatusCode.OK)
      .json({ message: "Successfully", data: existingUser });
  } catch (Exception) {
    res
      .status(HttpStatusCode.INTERNAL_SEVER_EROR)
      .json({ message: Exception.toString() });
  }
}

export default {
  postResult,
  getResultByIdUser,
  getResultByIdExam,
};
