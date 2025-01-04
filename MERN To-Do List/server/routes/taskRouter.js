const taskCtrl = require("../controllers/taskCtrl");
const isAuthenticated = require("../middlewares/isAuth");
const express = require("express");
const taskRouter = express.Router();

// Create
taskRouter.post("/to-do/create", isAuthenticated, taskCtrl.add);

taskRouter.get("/to-do/lists", isAuthenticated, taskCtrl.lists);

taskRouter.get("/to-do/filter", isAuthenticated, taskCtrl.filter);

taskRouter.put("/to-do/update/:id", isAuthenticated, taskCtrl.update);

taskRouter.delete("/to-do/delete/:id", isAuthenticated, taskCtrl.delete);





module.exports = taskRouter;
