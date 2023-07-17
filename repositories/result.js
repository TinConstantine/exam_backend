import Exception from "../Exception/exception.js";
import { result, exam, user } from "../Models/index.js";
async function postResult({ idExam, idUser, point }) {
  const existingExam = await exam.findById(idExam).exec();
  const existingUser = await user.findById(idUser).exec();
  if (!existingExam) {
    throw new Exception("Invalid exam!");
  }
  if (!existingUser) {
    throw new Exception("Invalid user!");
  }
  const finalResult = await result.create({ idExam, idUser, point });
  return finalResult;
}
async function getResultByIdUser({ idUser }) {
  const existingUser = await result.find({ idUser: idUser });
  if (!existingUser) {
    throw new Exception("Invalid user! ");
  }
  console.log(existingUser);
  return existingUser;
}

async function getResultByIdExam({ idExam }) {
  const existingExam = await result.find({ idExam: idExam });
  if (!existingExam) {
    throw new Exception("Invalid exam! ");
  }
  console.log(existingExam);

  return existingExam;
}
export default {
  postResult,
  getResultByIdExam,
  getResultByIdUser,
};
