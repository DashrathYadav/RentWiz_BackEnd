const express = require("express");
const router = express.Router();
const PropertyController  = require("../controllers/property.controller");
const verifyToken = require("../middlewares/auth");
const propertyController = new PropertyController();

router.get("/:propertyId",verifyToken,propertyController.getPropertyById);
router.post("/create",verifyToken,propertyController.createProperty);
router.post("/update",verifyToken,propertyController.updateProperty);
router.post("/deActivate/propertyId",verifyToken,propertyController.deActivatePropertyById);
module.exports = router;