const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./model/taskModel");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//midleware a function that has access to the request, response and the next function
// const logger=(req,res,next)=>{
//   console.log("Middleware ran");
//   console.log(req.body);
//   console.log(req.method);
//   next();
// };

//routs
app.get("/", (req, res) => {
  res.send("welcome to home page ");
});
//create task
app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
});
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`the server run on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// const startServer= async (req, res) => {
//   try {
//     await connectDB();

//   } catch (error) {

//   }
// };
// startServer();
