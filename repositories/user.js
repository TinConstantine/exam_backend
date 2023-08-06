import Exception from "../Exception/exception.js";
import bcrypt from "bcrypt";
import { user, department } from "../Models/index.js";
async function login({ username, password }) {
  let existingUser = await user.findOne({ username }).exec();
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
async function update({ name, username, password, gender, address }) {
  const existingUser = await user.findOne({ username }).exec();
  if (existingUser) {
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    existingUser.name = name ?? existingUser.name;
    existingUser.password = hashPassword ?? existingUser.password;
    existingUser.gender = gender ?? existingUser.gender;
    existingUser.address = address ?? existingUser.address;
    await existingUser.save();
  }
  return { ...existingUser._doc, password: "Not show" };
}
async function register({
  name,
  username,
  password,
  idDepartment,
  gender,
  address,
}) {
  const existingUser = await user.findOne({ username }).exec();
  debugger;
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }
  debugger;
  const existingDepartment = await department.findOne({ idDepartment }).exec();
  if (!existingDepartment) {
    throw new Exception(Exception.INVALID_DEPARTMENT);
  }

  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = await user.create({
    name,
    username,
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
async function check({ username }) {
  const existingUser = await user.findOne({ username }).exec();
  if (!existingUser) {
    throw new Exception(Exception.CANNOT_FIND_USERNAME);
  }
}
export default { login, register, update, check };
