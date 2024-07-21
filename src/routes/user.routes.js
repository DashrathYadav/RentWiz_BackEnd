const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");
const userController = new UserController();

router.get("/profile/:userId",verifyToken,userController.getUserProfile);
router.get("/users",verifyToken,userController.getAllUser);
module.exports = router;