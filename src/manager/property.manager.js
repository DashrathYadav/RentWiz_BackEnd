const UserData = require("../dataLayer/user.data");
const apiResponse = require("../helpers/apiResponse");
const logger = require("../helpers/logger");
const {logError} = require("../helpers/utility");
const AddressManager = require("./address.manager");
const addressManager = new AddressManager();
const PropertyData = require("../dataLayer/property.data");
const propertyData = new PropertyData();

class PropertyManager {

    async getPropertyById(propertyId) {
        try {
            //sanitizing the input
            if (propertyId <= 0 || propertyId == null || propertyId === "" || isNaN(propertyId)) {
                return null;
            }
            return await propertyData.getPropertyById(propertyId);
        } catch (error) {
            throw error;
        }
    }

    async createPropertyNAddress(property,address) {
        try {
            //sanitizing the input
            if (property == null || property === "" || property === undefined) {
                return null;
            }
            if (address == null || address === "" || address === undefined) {
                return null;
            }
            //create address
            let addressRes = await addressManager.createAddress(address);
            if (addressRes != null && addressRes.addressId > 0) {
                property.addressId = addressRes.addressId;
                return await propertyData.createProperty(property);
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async updateProperty(property) {
        try {
            //sanitizing the input
            if (property == null || property === "" || property === undefined) {
                return null;
            }
            return await propertyData.updateProperty(property);
        } catch (error) {
            throw error;
        }
    }

    async getAllPropertiesOfUser(userId,pageNo,pageSize) {
        try {
            //sanitizing the input
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return null;
            }
            return await propertyData.getAllPropertiesOfUser(userId,pageNo,pageSize);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PropertyManager;