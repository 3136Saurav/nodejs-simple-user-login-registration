const PORT = 8550;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const userRouter = require("./api/user/user.router");

const dbUrl = `mongodb+srv://root:${process.env.DB_PASSWORD}@learning-cluster.ddw5br4.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.json());

app.use("/api/user", userRouter);

async function connect() {
  try {
    await mongoose.connect(dbUrl);
    console.log(`Connected to DB`);
  } catch (error) {
    console.log(error);
  }
}

connect();

app.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);
