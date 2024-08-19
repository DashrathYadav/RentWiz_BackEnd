const express = require("express");

// const loginValidation = require("../models/request/login.validator");
const { AuthController } = require("../controllers/auth.controller");
const userValidation = require("../middlewares/validators/users/userRegistration.validator");
const addressValidation = require("../middlewares/validators/address/address.validator");

const authController = new AuthController();
const router = express.Router();

router.post("/login", authController.userLogin);
router.post(
  "/userRegister",
  userValidation,
  addressValidation,
  authController.userRegistration
);

module.exports = router;
