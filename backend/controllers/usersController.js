const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, phoneNumber, password, email } = req.body;
  if (!phoneNumber) {
    const userMailExist = await User.findOne({ email });
    console.log("ss", userMailExist);
    if (userMailExist) {
      res.status(400);
      throw new Error("User Already Exists!");
    }
  }
  const userExist = await User.findOne({ phoneNumber });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists!");
  }

  const user = await User.create({ name, phoneNumber, password, email });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const authController = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;
  const user = await User.findOne({ phoneNumber });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,

      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = {
  authController,

  registerUser,
};
