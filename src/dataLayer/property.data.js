const db = require("../../config/database");
const Table = require("../helpers/CONSTANTS/tableNameConst");
const { Property } = require('../../models');

class PropertyData {

        async getPropertyById(propertyId) {
            try {
                return (await Property.findOne({
                    where: {
                        propertyId: propertyId
                    }
                }))?.toJSON();
            } catch (error) {
                throw error;
            }
        }

        async createProperty(property) {
            try {
                return (await Property.create(property))?.toJSON();
            } catch (error) {
                throw error;
            }
        }

        async updateProperty(property) {
            try {
                return await Property.update(property, {
                    where: {
                        propertyId: property.propertyId
                    }
                });
            } catch (error) {
                throw error;
            }
        }

        async getAllPropertiesOfUser(userId,pageNo,pageSize) {
            try {
                return await Property.findAll({
                    where: {
                        userId: userId
                    },
                    limit: pageSize,
                    offset: (pageNo - 1) * pageSize
                });
            } catch (error) {
                throw error;
            }
        }
}