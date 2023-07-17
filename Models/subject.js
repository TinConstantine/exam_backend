import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
export default mongoose.model(
  "Subject",
  new Schema({
    id: { type: ObjectId },
    idDepartment: { type: String, required: true },
    idSubject: { type: String, required: true },
    nameSubject: { type: String, required: true },
  })
);
