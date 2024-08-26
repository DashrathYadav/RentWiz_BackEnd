//Room Validator
const joi = require("joi");
const apiResponse = require("../../../helpers/apiResponse");
// Create same validations as done for users and properties but use above properties and data

// Room Schema
// add proper messages to the schema
// each number filed should be interger

const roomSchema = {
    roomNo: joi.number().integer().required(),
    propertyId: joi.number().integer().required(),
    userId: joi.number().integer().required(),
    roomType: joi.string().empty(),
    roomSize: joi.string().empty(),
    roomRent: joi.number().empty(),
    currencyId: joi.number().integer().empty(),
    roomStatus: joi.number().integer().required(),
    roomPic: joi.string().empty(),
    roomDescription: joi.string().empty(),
    roomFacility: joi.string().empty(),
    addressId: joi.number().integer().empty(),
    roomCapacity: joi.number().integer().empty(),
    currentTenantCount: joi.number().integer().empty(),
    note: joi.string().empty(),
}

const validation = joi.object(roomSchema);

// Export the schema
const roomValidation = async (req, res, next) => {
    const room = req.body.room;
    const payload = {
        roomNo: room.roomNo,
        propertyId: room.propertyId,
        userId: room.userId,
        roomType: room.roomType,
        roomSize: room.roomSize,
        roomRent: room.roomRent,
        currencyId: room.currencyId,
        roomStatus: room.roomStatus,
        roomPic: room.roomPic,
        roomDescription: room.roomDescription,
        roomFacility: room.roomFacility,
        addressId: room.addressId,
        roomCapacity: room.roomCapacity,
        currentTenantCount: room.currentTenantCount,
        note: room.note,
    };

    const {error} = validation.validate(payload);
    if (error) {
        return apiResponse.notAcceptableRequest(res, `${error.message}`);
    } else {
        next();
    }
}
module.exports = roomValidation;



