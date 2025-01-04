const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const UserCtrl = require('../controllers/userCTRL');
const userRouter = express.Router();


userRouter.post('/to-do/register', UserCtrl.register);

userRouter.post('/to-do/login', UserCtrl.login);



module.exports = userRouter;