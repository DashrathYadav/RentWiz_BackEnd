const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");
const userController = new UserController();

router.get("/profile/:userId",verifyToken,userController.getUserProfile);
router.get("/users",verifyToken,userController.getAllUserAndPaginationMetaData);
router.get("/properties",verifyToken,userController.getAllPropertiesPaginated);
router.post("/create",verifyToken,userController.createUser);
router.post("/update",verifyToken,userController.updateUser);
router.post("/deActivate/userId",verifyToken,userController.deActivateUserById);
module.exports = router;