const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/isErr");
const taskRouter = require("./routes/taskRouter");
const cors = require("cors");

const PORT = 8000;

// DB connection
mongoose
  .connect("mongodb://localhost:27017/to-do")
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log("Error connecting to MongoDB: " + err));

// Middleware
app.use(express.json());
app.use(errorHandler);

// Enable CORS
const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

// Routes
app.use("/", userRouter);
app.use("/", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});
