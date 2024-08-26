/*3. Property
1. getPropertyById(propertyId)
2. createProperty( property)
3. updateProperty(property)
4 deActivateProperty(propertyId)
5. getAllPropertiesOfUser(userId)*/

const apiResponse = require("../helpers/apiResponse.js");
const PropertyManager = require("../manager/property.manager.js");
const {getPaginationAndFilterDataFromRequest, getUserId, IsInteger} = require("../helpers/utility");
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
            const result = await propertyManager.handleCreateProperty(property, address);
            if (result.status === 201) {
                return apiResponse.successResponseWithData(res, "Property Created successfully.", result.data);
            }
            return apiResponse.notAcceptableRequest(res, result);
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
            const userId = req.query.userId;
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return apiResponse.validationErrorWithData(res, "Invalid user id.", {userId: userId});
            }
            const paginationData = getPaginationAndFilterDataFromRequest(req);
            const properties = await propertyManager.getAllPropertiesOfUserPaginated(userId, paginationData);
            if (properties != null ) {
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

    async updateStatus(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const propertyId = req.body.propertyId;
            const propertyUserId = req.body.userId;
            const propertyStatus = req.body.propertyStatus;
            if (!IsInteger(propertyId)) {
                return apiResponse.validationErrorWithData(res, "Invalid property id.", {propertyId: propertyId});
            }
            if (!IsInteger(propertyUserId)) {
                return apiResponse.validationErrorWithData(res, "Invalid user id.", {userId: propertyUserId});
            }
            if (!IsInteger(propertyStatus)) {
                return apiResponse.validationErrorWithData(res, "Invalid status.", {propertyStatus: propertyStatus});
            }

            //get the id of the logged-in user who initiated the request.
            const modifiedBy = getUserId(req);
            const result = await propertyManager.updatePropertyStatus(propertyStatus,propertyId,propertyUserId,modifiedBy);
            if (result != null && result[0] > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Updated property: success.",
                    result
                );
            } else {
                return apiResponse.notFoundResponse(
                    res,
                    "Failed to update Property.",
                );
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }
}

module.exports = PropertyController;