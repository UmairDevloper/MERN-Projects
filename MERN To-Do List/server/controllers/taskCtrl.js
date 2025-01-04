const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

const taskCtrl = {
  // create
  add: asyncHandler(async (req, res) => {
    const { title, description, status, date } = req.body;

    // Require fields
    if (!title || !description || !status) {
      throw new Error("Please fill all the fields...");
    }

    const taskCreated = await Task.create({
      user: req.user,
      title,
      description,
      status,
      date,
    });

    res.json({ taskCreated });
  }),

  // Lists
  lists: asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user });

    res.json(tasks);
  }),

  // Update
  update: asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task && task.user.toString() === req.user.toString()) {
      (task.title = req.body.title || task.title),
        (task.description = req.body.description || task.description),
        (task.status = req.body.status || task.status),
        (task.date = req.body.date || task.date);

      const taskUpdated = await task.save();

      res.json(taskUpdated);
    } else {
      throw new Error("Task not found...");
    }
  }),

  // Delete
  delete: asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task && task.user.toString() === req.user.toString()) {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: "Task deleted successfully" });
    } else {
      throw new Error("Task not found...");
    }
  }),

  filter: asyncHandler(async (req, res) => {
    const { title, status } = req.query;

    let filters = { user: req.user };

    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }

    if (status === "All") {
    } else {
      filters.status = status;
    }

    const tasks = await Task.find(filters).sort({ date: -1 });

    res.json({ message: "Tasks fetched successfully", tasks });
  }),
};

module.exports = taskCtrl;
