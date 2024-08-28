const express = require("express");
const router = express.Router();
const PropertyController  = require("../controllers/property.controller");
const RoomController  = require("../controllers/room.controller");
const verifyToken = require("../middlewares/auth");
const roomValidation = require("../middlewares/validators/room/room.validator");
const roomController = new RoomController();

router.post("/create",verifyToken,roomValidation,roomController.createRoom);
router.get("/:roomId",verifyToken,roomController.getRoomById);
module.exports = router;