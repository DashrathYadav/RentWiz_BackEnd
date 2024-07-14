const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/user.controller");
const userController = new UserController();

router.get("/profile",userController.getProfile);

module.exports = router;