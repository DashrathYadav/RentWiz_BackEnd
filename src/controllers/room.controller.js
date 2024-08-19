// src/controllers/room.controller.js

const RoomManager = require('../manager/room.manager');
const apiResponse = require('../helpers/apiResponse');
const {getUserId, ApiErrorResponse} = require("../helpers/utility");
const roomManager = new RoomManager();

class RoomController {
    async createRoom(req, res) {
        try {
            const roomData = req.body.room;
            const createdBy = getUserId(req);
            const room = await roomManager.handleRoomCreate(roomData,createdBy);
            return apiResponse.successResponseWithData(res, "Room created successfully.", room);
        } catch (error) {
            return ApiErrorResponse(res,error,);
        }
    }

    async getRoomById(req, res) {
        try {
            const roomId = req.params.roomId;
            const room = await RoomManager.getRoomById(roomId);
            if (room) {
                return apiResponse.successResponseWithData(res, "Room fetched successfully.", room);
            } else {
                return apiResponse.notFoundResponse(res, "Room not found.");
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async getAllRoomsOfPropertyPaginated(req, res) {
        try {
            const propertyId = req.params.propertyId;
            const paginationData = getPaginationAndFilterDataFromRequest(req);
            const rooms = await RoomManager.getAllRoomsOfPropertyPaginated(propertyId, paginationData);
            return apiResponse.successResponseWithData(res, "Rooms fetched successfully.", rooms);
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async changeRoomStatus(req, res) {
        try {
            const roomId = req.params.roomId;
            const status = req.body.status;
            const result = await RoomManager.changeRoomStatus(roomId, status);
            return apiResponse.successResponseWithData(res, "Room status updated successfully.", result);
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
}

module.exports = RoomController;