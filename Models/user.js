import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
export default mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    idDepartment: {
      type: String,
      required: true,
    },
    gender: {
      type: String, // kieu string
      enum: {
        values: ["Male", "Female"], // co 2 gia tri male va female <dung lam button>
        message: "{VALUE} is not supported",
      },
      require: true,
    },

    address: {
      type: String,
      required: false,
    },
  })
);
