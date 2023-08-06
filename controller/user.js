import { userRepositories } from "../repositories/index.js";
import HttpStatusCode from "../Exception/HttpStatusCode.js";
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
export default { login, register, update, check };
