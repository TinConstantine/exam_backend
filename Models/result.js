import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
export default mongoose.model(
  "Result",
  new Schema({
    id: { type: ObjectId },
    idExam: { type: String, required: true },
    idUser: { type: String, required: true },
    point: { type: String },
  })
);
