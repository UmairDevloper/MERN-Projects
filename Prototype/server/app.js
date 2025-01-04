const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRouter");
const app = express();
const PORT = process.env.PORT || 3000;

//? Connect to Database
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Connected to database successfully..."))
  .catch((err) => console.log("Error connecting to database"));

// ? Middleware
app.use(express.json());
app.use(errorHandler);

//? Routes

app.use("/", userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}....`));
