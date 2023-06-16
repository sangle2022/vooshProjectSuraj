const express = require("express");
const {
  authController,

  registerUser,
} = require("../controllers/usersController");

const router = express.Router();

//user registration
router.route("/").post(registerUser);

router.post("/login", authController);

module.exports = router;
