/*3. Property
1. getPropertyById(propertyId)
2. createProperty( property)
3. updateProperty(property)
4 deActivateProperty(propertyId)
5. getAllPropertiesOfUser(userId)*/

const apiResponse = require("../helpers/apiResponse.js");
const PropertyManager = require("../manager/property.manager.js");
const {getPaginationAndFilterDataFromRequest} = require("../helpers/utility");
const propertyManager = new PropertyManager();

class PropertyController {

    async getPropertyById(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const propertyId = req.params.propertyId;
            if (propertyId <= 0 || propertyId == null || propertyId === "" || isNaN(propertyId)) {
                return apiResponse.validationErrorWithData(res, "Invalid property id.", {propertyId: propertyId});
            }
            const property = await propertyManager.getPropertyById(propertyId);
            if (property != null && property.propertyId > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Get property: success.",
                    property
                );
            } else {
                return apiResponse.notFoundResponse(
                    res,
                    "Property not found."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async createProperty(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const property = req.body.property;
            const address = req.body.address;
            if (property == null || property === "") {
                return apiResponse.validationErrorWithData(res, "Invalid property.", {property: property});
            }
            if (address == null || address === "") {
                return apiResponse.validationErrorWithData(res, "Invalid address.", {address: address});
            }
            const result = await propertyManager.createPropertyNAddress(property,address);
            if (result != null && result.propertyId > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Create property: success.",
                    result
                );
            } else {
                return apiResponse.notFoundResponse(
                    res,
                    "Property not found."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async updateProperty(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const property = req.body.property;

            if (property == null || property === "") {
                return apiResponse.validationErrorWithData(res, "Invalid property.", {property: property});
            }
            const result = await propertyManager.updateProperty(property,ad);
            if (result != null && result.propertyId > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Update property: success.",
                    result
                );
            } else {
                return apiResponse.notFoundResponse(
                    res,
                    "Property not found.",
                );
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async getAllPropertiesOfUserPaginated(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const userId = req.params.userId;
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return apiResponse.validationErrorWithData(res, "Invalid user id.", {userId: userId});
            }
            const paginationData = getPaginationAndFilterDataFromRequest(req);
            const properties = await propertyManager.getAllPropertiesOfUserPaginated(userId, paginationData);
            if (properties != null && properties.length > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Get all properties of user: success.",
                    properties
                );
            } else {
                return apiResponse.notFoundResponse(
                    res,
                    "Properties not found."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
}

module.exports = PropertyController;