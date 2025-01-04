const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const UserCtrl = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all fields are filled
    if (!username || !email || !password) {
      throw new Error("Please fill all the fields...");
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exists...");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // ? Display the user
    res.json({
      message: "User registered successfully",
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // find the user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found...");
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid  password...");
    }

    // Create token
    const token = jwt.sign({ id: user._id }, "token", { expiresIn: "30d" });

    // ? Display the user
    res.json({
      message: "User logged in successfully",
      username: user.username,
      token,
      email: user.email,
      id: user._id,
    });
  }),

  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);

    // if (!user) {
    //   throw new Error("User not found...");
    // }

    // ? Display the user
    res.json({
      message: "User Profile created successfully",

      email: user.email,
      id: user._id,
    });
  }),

  // changePassword
  changePassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    //? find user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found...");
    }

    //? hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //? update password
    user.password = hashedPassword;

    //? save user
    await user.save({
      validateBeforeSave: false,
    })

    //? display user
    res.json({
      message: "Password changed successfully",
    });
  }),

  // update User
  updateUser: asyncHandler(async (req, res) => {
    const { email, username } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "User updated successfully",
      updateUser,
    });
  }),
};

module.exports = UserCtrl;
