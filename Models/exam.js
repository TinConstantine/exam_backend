import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
export default mongoose.model(
  "Exam",
  new Schema({
    id: { type: ObjectId },
    idSubject: { type: String, required: true },
    idExam: { type: String, required: true },
    nameExam: { type: String, required: true },
    file: { type: String, required: true },
    result: { type: String, required: true },
    time: { type: String, required: true },
    quantity: { type: String, required: true },
  })
);
