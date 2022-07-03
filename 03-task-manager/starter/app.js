const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//connect to mongoDB asynchronously
const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

start();

//routes
app.use("/api/v1/tasks", tasks);

//app listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
