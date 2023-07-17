import Exception from "../Exception/exception.js";
import bcrypt from "bcrypt";
import { user, department } from "../Models/index.js";
async function login({ email, password }) {
  let existingUser = await user.findOne({ email }).exec();
  if (existingUser) {
    let isMatched = await bcrypt.compare(password, existingUser.password);
    if (isMatched) {
      return { ...existingUser._doc, password: "Not show" };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
  }
}

async function register({
  name,
  email,
  phoneNumber,
  password,
  idDepartment,
  gender,
  address,
}) {
  const existingUser = await user.findOne({ email }).exec();
  debugger;
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }
  debugger;
  const existingDepartment = await department.findOne({ idDepartment }).exec();
  if (!existingDepartment) {
    throw new Exception(Exception.INVALID_DEPARTMENT);
  }

  console.log(process.env.SALT_ROUNDS);
  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = await user.create({
    name,
    email,
    phoneNumber,
    password: hashPassword,
    idDepartment,
    gender,
    address,
  });
  return {
    ...newUser._doc,
    password: "Not show",
  };
}

export default { login, register };
