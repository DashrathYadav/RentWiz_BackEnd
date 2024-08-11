const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");
const userValidation = require("../middlewares/validators/users/userRegistration.validator");
const addressValidation = require("../middlewares/validators/address/address.validator");
const userController = new UserController();

router.get("/profile/:userId",verifyToken,userController.getUserProfile);
router.get("/users",verifyToken,userController.getAllUserAndPaginationMetaData);
router.get("/properties",verifyToken,userController.getAllPropertiesPaginated);
router.post("/create",verifyToken,userValidation,addressValidation,userController.createUser);
router.post("/update",verifyToken,userValidation,userController.updateUser);
router.post("/deActivate/userId",verifyToken,userController.deActivateUserById);
module.exports = router;