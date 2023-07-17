import express, { request } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import mammoth from "mammoth";
import fs from "fs";
import cors from "cors";
import connect from "./database/database.js";
import bodyParser from "body-parser";
import HttpStatusCode from "./Exception/HttpStatusCode.js";

import {
  userRouter,
  departmentRouter,
  subjectRouter,
  viewRouter,
  resultRouter,
} from "./routes/index.js";
const app = express();
app.use(cors({ origin: "*" }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/department", departmentRouter);
app.use("/subject", subjectRouter);
app.use("/exam", viewRouter);
app.use("/result", resultRouter);
app.get("/view-doc/:id", (req, res) => {
  const directoryPath = "./public/" + req.params.id;
  console.log(directoryPath);
  fs.readFile(directoryPath, "binary", (err, data) => {
    if (err) {
      res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
        "Error reading file": err.toString(),
      });
      return;
    }
    mammoth
      .convertToHtml({ buffer: Buffer.from(data, "binary") })
      .then((result) => {
        const html = result.value;
        res.send(html);
      })
      .catch((err) => {
        res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
          "Error while converting files": err.toString(),
        });
      });
  });
});
app.get("/exam/update/view-doc/:id", (req, res) => {
  const directoryPath = "./public/" + req.params.id;
  console.log(directoryPath);
  fs.readFile(directoryPath, "binary", (err, data) => {
    if (err) {
      res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
        "Error reading file": err.toString(),
      });
      return;
    }
    mammoth
      .convertToHtml({ buffer: Buffer.from(data, "binary") })
      .then((result) => {
        const html = result.value;
        res.send(html);
      })
      .catch((err) => {
        res.status(HttpStatusCode.INTERNAL_SEVER_EROR).json({
          "Error while converting files": err.toString(),
        });
      });
  });
});
app.get("/", (req, res) => {
  res.render("homepage");
});
const port = process.env.PORT ?? 3003;
app.listen(port, async () => {
  await connect();
  console.log("listening on port " + port);
});
