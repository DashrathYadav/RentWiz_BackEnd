const express = require("express");
const router = express.Router();
const PropertyController  = require("../controllers/property.controller");
const verifyToken = require("../middlewares/auth");
const addressValidation = require("../middlewares/validators/address/address.validator");
const propertyValidation = require("../middlewares/validators/property/property.validator");
const propertyController = new PropertyController();

router.get("/:propertyId",verifyToken,propertyController.getPropertyById);
router.post("/create",verifyToken,propertyValidation,addressValidation,propertyController.createProperty);
router.post("/update",verifyToken,propertyController.updateProperty);
module.exports = router;