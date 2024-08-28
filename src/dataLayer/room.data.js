// src/data/room.data.js

const { Room } = require('../../models');

class RoomData {
    async findRoomByRoomNoPropertyIdUserId(roomNo, propertyId, userId) {
        try {
            return  (await Room.findOne({where: {roomNo, propertyId, userId}}))?.toJSON();
        }
        catch (error) {
            throw error;
        }
    }

    async createRoom(roomData) {
        try {
            return await Room.create(roomData);
        } catch (error) {
            throw error;
        }
    }

    async getRoomById(roomId) {
        try {
            return (await Room.findByPk(roomId))?.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async getAllRoomsOfPropertyPaginated(propertyId, paginationData) {
        const {page, limit} = paginationData;
        return await Room.findAndCountAll({
            where: {propertyId},
            limit,
            offset: (page - 1) * limit
        });
    }

    async changeRoomStatus(roomId, status) {
        return await Room.update({roomStatus: status}, {where: {roomId}});
    }
}

module.exports = RoomData;