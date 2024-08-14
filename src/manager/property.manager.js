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

    async handleCreateProperty(property,address,loggedInUserId) {
        try {
            //sanitizing the input
            if (property == null || property === "" || property === undefined) {
                return {
                    status: 400,
                    message: "Invalid  Property data",
                };
            }
            if (address == null || address === "" || address === undefined) {
                return {
                    status: 400,
                    message: "Invalid address data",
                }
            }
            //create address
            const newAddress = {
                street: address.street,
                landMark: address.landMark,
                area: address.area,
                cityId: address.cityId,
                pincode: address.pincode,
                stateId: address.stateId,
                countryId: address.countryId,
            };
            let addressObj = await addressManager.createAddress(newAddress);
            //If address not created then return error
            if (addressObj == null || addressObj.addressId == null || addressObj.addressId <= 0) {
                return {
                    status: 400,
                    message: "Failed to create address",
                };
            }

            //create property
            const newProperty = {
                propertyName: property.propertyName,
                propertyType: property.propertyType,
                propertySize: property.propertySize,
                propertyRent: property.propertyRent,
                propertyStatus: property.propertyStatus,
                propertyPic: property.propertyPic,
                propertyDescription: property.propertyDescription,
                propertyFacility: property.propertyFacility,
                userId: property.userId,
                addressId: addressObj.addressId,
                note: property.note,
                createdBy: loggedInUserId,
                lastModifiedBy: loggedInUserId,
                creationDate: new Date(),
                lastModificationdDate: new Date(),
            };

            let propertyObj = await propertyData.createProperty(newProperty);
            if(propertyObj) {
                return {
                    status: 201,
                    message: "Property created",
                    data: propertyObj,
                };
            }
            return {
                status: 400,
                message: "Failed to create property",
            };

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

    async getAllPropertiesOfUserPaginated(userId,paginationData) {
        try {
            //sanitizing the input
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return null;
            }
            return await propertyData.getAllPropertiesOfUserPaginated(userId,paginationData);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PropertyManager;