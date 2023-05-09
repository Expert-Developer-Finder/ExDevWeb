import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {
  contactRouter,
  queryRouter,
  repoRouter,
  userRouter,
} from "./routes/index.js";
import nodemailer from "nodemailer";

const app = express();
dotenv.config();
app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(bodyParser.json()); // for parsing application/json
app.use(cors());

app.use("/user", userRouter);
app.use("/repos", repoRouter);
app.use("/contact", contactRouter);
app.use("/query", queryRouter);

const PORT = process.env.PORT;

app.post("/sendMail", (req, res) => {
  const { toStr, subjectStr, textStr } = req.body;

  // Configure mailer transporter
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: toStr,
    subject: subjectStr,
    text: textStr,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.send().status(200).json("Mail sent");
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.log(error);
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
