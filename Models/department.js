import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
export default mongoose.model(
  "Department",
  new Schema({
    id: {
      type: ObjectId,
    },
    idDepartment: {
      type: String,
      required: true,
    },
    nameDepartment: {
      type: String,
      required: true,
    },
  })
);
