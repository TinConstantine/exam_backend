export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_CONNECTION_STRING = "Wrong sever name/connection string";
  static CANNOT_CONNECT_MONGODB = "Cannot connect to Mongoose";
  static USER_EXIST = "User already exists";
  static DEPARTMENT_EXIST = "Department already exists";
  static CANNOT_REGISTER_USER = " Cannot register user ";
  static LOGIN_SUCCESSFUL = "Login successful";
  static WRONG_EMAIL_AND_PASSWORD = "Wrong email or password";
  static DEPARTMENT_HAS_BEEN_USED = "Department has been used";
  static SUBJECT_HAS_BEEN_USED = "Subject has been used";
  static INVALID_DEPARTMENT = "Invalid department";
  static SUBJECT_EXIST = "Subject already exists";
  static INVALID_SUBJECT = "Invalid subject";

  constructor(message, validationErrors = {}) {
    super(message); // call constructor of parent class (Erorr)
    console.log(message);
    this.validationErrors = validationErrors;
  }
}
