const { Property } = require('../../models');
const {getSanitizedPaginationAndFilterCondition, getPaginationMetaData} = require("../helpers/utility");

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

    async getAllPropertiesOfUserPaginated(userId, paginationData) {
        try {

            // Get pagination and filter
            const {
                _pageSize,
                _pageNumber,
                _condition,
                _orderBy
            } = getSanitizedPaginationAndFilterCondition(paginationData);

            // Set default orderByField if not provided
            const _orderByField = paginationData.orderByField || 'propertyId';

            // Run query
            const result = await Property.findAndCountAll({
                where: {
                    userId: userId,
                    ..._condition
                },
                limit: _pageSize,
                offset: (_pageNumber - 1) * _pageSize,
                order: [[_orderByField, _orderBy]]
            });

            return {
                properties: result.rows,
                paginationMetaData: getPaginationMetaData(result, _pageSize, _pageNumber),
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PropertyData;