const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");
const userController = new UserController();

router.get("/profile",verifyToken,userController.getProfile);

module.exports = router;