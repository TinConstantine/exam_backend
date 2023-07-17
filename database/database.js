import mongoose from "mongoose";
import Exception from "../Exception/exception.js";
mongoose.set("strictQuery", true);

async function connect() {
  try {
    debugger;
    let connection = await mongoose.connect(process.env.MONGO_URI); // giong C# dung de luu tru ket noi den co so du lieu
    debugger;
    console.log("Connect mongoose succesfull");
    return connection; // dung de thuc hien thao tac tren csdl (nhu c# co connection.Open())
  } catch (erorr) {
    // let errorMessage
    debugger;
    const { code } = erorr;
    if (error.code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    }
    throw new Exception(Exception.CANNOT_CONNECT_MONGODB);
  }
}

export default connect;
