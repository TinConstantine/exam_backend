import Exception from "../Exception/exception.js";
import { department, subject, user } from "../Models/index.js";
async function addDepartment({ idDepartment, nameDepartment }) {
  let existingDepartment = await department.findOne({ idDepartment }).exec();
  if (!!existingDepartment) {
    throw new Exception(Exception.DEPARTMENT_EXIST);
  }
  const newDepartment = await department.create({
    idDepartment,
    nameDepartment,
  });
  return {
    ...newDepartment._doc,
  };
}

async function updateDepartment({ id, idDepartment, nameDepartment }) {
  // tim id moi dc nhap vao
  const usedId = await department.findOne({ idDepartment }).exec();
  var idUsed = "";
  if (!!usedId) {
    // neu da duoc su dung
    idUsed = usedId._id.toString();
  } else {
    idUsed = id;
  }

  if (idUsed != id) {
    throw new Exception(Exception.DEPARTMENT_EXIST);
  }
  const update = await department.findById(id).exec();
  var smth = update.idDepartment; // tim theo id hien tai
  const idDepartmentUsed = await user.findOne({ smth }).exec();
  const idDepartmentSub = await subject.findOne({ smth }).exec();

  console.log(smth);
  if (!!idDepartmentUsed || !!idDepartmentSub) {
    if (update.idDepartment != idDepartment) {
      throw new Exception(Exception.DEPARTMENT_HAS_BEEN_USED);
    } else {
      update.nameDepartment = nameDepartment ?? update.nameDepartment;
      await update.save();
    }
  } else {
    console.log("Hello");
    update.idDepartment = idDepartment ?? update.idDepartment;
    update.nameDepartment = nameDepartment ?? update.nameDepartment;
    await update.save();
  }
}
async function deleteDepartment({ id }) {
  //lay idName
  const existingDepartment = await department.findById(id).exec();
  const name = existingDepartment.idDepartment;
  const existingUser = await user.findOne({ idDepartment: name }).exec();
  const existingSubject = await subject.findOne({ idDepartment: name }).exec();
  if (!!existingSubject || !!existingUser) {
    throw new Exception(Exception.DEPARTMENT_HAS_BEEN_USED);
  } else {
    await department.findByIdAndDelete(id);
  }
}
async function getDepartment({ id }) {
  const existingDepartment = await department.findById(id).exec();
  if (!existingDepartment) {
    throw new Exception(Exception.INVALID_DEPARTMENT);
  }
  return existingDepartment;
}
async function getAllDepartment() {
  const allDepartment = await department.find({});
  return allDepartment;
}

export default {
  addDepartment,
  updateDepartment,
  getAllDepartment,
  deleteDepartment,
  getDepartment,
};
