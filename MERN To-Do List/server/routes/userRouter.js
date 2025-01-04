const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const UserCtrl = require('../controllers/userCtrl');

const userRouter = express.Router();



userRouter.post('/to-do/register', UserCtrl.register);

userRouter.post('/to-do/login', UserCtrl.login);

userRouter.get('/to-do/profile',isAuthenticated,  UserCtrl.profile);

userRouter.put('/to-do/change-password',isAuthenticated,  UserCtrl.changePassword);

userRouter.put('/to-do/update-profile',isAuthenticated,  UserCtrl.updateUser);
module.exports = userRouter;