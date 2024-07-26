/**
 * file which containts all routes of the Common controllers.
 */
const express = require("express");
const { CommonController } = require("../controllers/common.controller.js");
const verifyToken = require("../middlewares/auth.js");
const commonController = new CommonController();
const router = express.Router();



//router.post("/getProfile", verifyToken, commonController.getProfile);

module.exports = router;