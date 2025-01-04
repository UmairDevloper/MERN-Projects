const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/User");

const UserCtrl = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all fields are filled
    if (!username || !email || !password) {
      throw new Error("Please fill all the fields...");
    }

    // Check if user already exists
    const userExist = await Users.findOne({ email });
    if (userExist) {
      throw new Error("User already exists...");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userCreated = new Users({
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
    const user = await Users.findOne({ email });
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

  profile: asyncHandler(async (req, res) => {}),
};

module.exports = UserCtrl;
