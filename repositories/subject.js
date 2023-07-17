import Exception from "../Exception/exception.js";
import { department, subject, exam } from "../Models/index.js";
async function addSubject({ idDepartment, idSubject, nameSubject }) {
  const existingDepartment = await department.findOne({ idDepartment }).exec();
  if (!existingDepartment) {
    throw new Exception(Exception.INVALID_DEPARTMENT);
  }
  const existingSubject = await subject.findOne({ idSubject }).exec();
  if (!!existingSubject) {
    throw new Exception(Exception.SUBJECT_EXIST);
  }
  const newSubject = await subject.create({
    idDepartment,
    idSubject,
    nameSubject,
  });
  return { ...newSubject._doc };
}

async function updateSubject({ id, idDepartment, idSubject, nameSubject }) {
  const existingDepartment = await department.findOne({ idDepartment }).exec();
  if (!existingDepartment) {
    throw new Exception(Exception.INVALID_DEPARTMENT);
  }
  const update = await subject.findById(id).exec();
  const existingSubject = await exam.findOne({ idSubject }).exec();
  if (!!existingSubject) {
    if (update.idSubject != idSubject) {
      throw new Exception(Exception.SUBJECT_HAS_BEEN_USED);
    } else {
      update.idDepartment = idDepartment ?? update.idDepartment;
      update.nameSubject = nameSubject ?? update.nameSubject;
      await update.save();
    }
  } else {
    update.idDepartment = idDepartment ?? update.idDepartment;
    update.idSubject = idSubject ?? update.idSubject;
    update.nameSubject = nameSubject ?? update.nameSubject;
    await update.save();
  }
}

async function getAllSubject() {
  const allSubject = await subject.find({});
  return allSubject;
}
async function deleteSubject({ id }) {
  const existingSubject = await subject.findById(id).exec();
  const name = existingSubject.idSubject;
  const existingExam = await exam.findOne({ idSubject: name }).exec();
  if (!!existingExam) {
    throw new Exception(Exception.SUBJECT_HAS_BEEN_USED);
  }
  await subject.findByIdAndDelete(id);
}
async function getSubject({ id }) {
  const existingSubject = await subject.findById(id).exec();
  if (!existingSubject) {
    throw new Exception(Exception.INVALID_SUBJECT);
  }
  return existingSubject;
}
export default {
  addSubject,
  updateSubject,
  getAllSubject,
  deleteSubject,
  getSubject,
};
