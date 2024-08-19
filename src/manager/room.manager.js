// src/managers/room.manager.js

const RoomData = require('../dataLayer/room.data');
const PropertyData = require("../dataLayer/property.data");
const {IsNullOrEmpty} = require("../helpers/utility");
const {ClientError} = require("../helpers/CustomError");
const {ExceptionHandler} = require("winston");
const propertyData = new PropertyData();
const roomdata = new RoomData();

class RoomManager {
    async handleRoomCreate(roomData,createdBy) {
        try {

            if (IsNullOrEmpty(roomdata)) {
                throw new ClientError("Invalid room data.Room Data cannot be null or empty.", 400, roomData);
            }
            // Check if room already exists
            const existingRoom = await roomdata.findRoomByRoomNoPropertyIdUserId(roomData.roomNo, roomData.propertyId, roomData.userId);
            if (existingRoom) {
                throw new ClientError("Room with given data already exists.", 409, existingRoom);
            }

            // Fetch addressId of the property
            const property = await propertyData.getPropertyById(roomData.propertyId);
            if (!property) {
                throw new ClientError(`Property with propertyId: ${roomData.propertyId} do not exist`, 400, roomData);
            }

            const roomObj = {
                roomNo: roomData.roomNo,
                propertyId: roomData.propertyId,
                userId: roomData.userId,
                roomType: roomData.roomType,
                roomSize: roomData.roomSize,
                roomRent: roomData.roomRent,
                currencyId: roomData.currencyId,
                roomStatus: roomData.roomStatus,
                roomPic: roomData.roomPic,
                roomDescription: roomData.roomDescription,
                roomFacility: roomData.roomFacility,
                addressId: property.addressId,
                roomCapacity: roomData.roomCapacity,
                currentTenantCount: roomData.currentTenantCount,
                note: roomData.note,
                createdBy: createdBy,
                lastModifiedBy: createdBy
            }

            // Create room
            return await roomdata.createRoom(roomObj);
        } catch (error) {
            throw error;
        }
    }

    async getRoomById(roomId) {
        return await RoomData.getRoomById(roomId);
    }

    async getAllRoomsOfPropertyPaginated(propertyId, paginationData) {
        return await RoomData.getAllRoomsOfPropertyPaginated(propertyId, paginationData);
    }

    async changeRoomStatus(roomId, status) {
        return await RoomData.changeRoomStatus(roomId, status);
    }
}

module.exports = RoomManager;