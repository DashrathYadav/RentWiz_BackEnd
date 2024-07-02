const express = require("express");

// const loginValidation = require("../models/request/login.validator");
const userValidation = require("../models/request/user.validator");
const { AuthController } = require("../controllers/auth.controller");

const authController = new AuthController(); 
const router = express.Router();

router.post("/login", authController.userLogin);
router.post("/register", authController.userRegistration);

module.exports = router;