const apiResponse = require("../helpers/apiResponse.js");
const UserManager = require("../manager/user.manager.js");
const PropertyManager = require("../manager/property.manager.js");
const {getPaginationAndFilterDataFromRequest, getUserId} = require("../helpers/utility");
const userManager = new UserManager();
class UserController {

    /**
     * Get user profile
     * @param req
     * @param res
     * @response: if success then return user Record
     */
    async getUserById(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const userId = req.params.userId;
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return apiResponse.validationErrorWithData(res, "Invalid user id.", {userId: userId});
            }
            const user = await userManager.getUserById(userId);
            if (user != null && user.userId > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Get user profile: success.",
                    user
                );
            } else {
                return apiResponse.notFoundResponse(
                    res,
                    "User not found."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async getAllUserAndPaginationMetaData(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const paginationData = getPaginationAndFilterDataFromRequest(req);
            const orderByField = req.query.orderByField;
            const usersAndPaginationMetaData = await userManager.getAllUserAndPaginationMetaData(paginationData);
            if (usersAndPaginationMetaData != null) {
                return apiResponse.successResponseWithData(
                    res,
                    "Get all user: success.",
                    usersAndPaginationMetaData
                );
            } else {
                return apiResponse.notFoundResponse(
                    res,
                    "User not found."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async createUser(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const result = await userManager.handleCreateUser(req);
            //If user created successfully then login user
            if (result.status === 201) {
                return apiResponse.successResponseWithData(res, "User registered successfully.",result.data);
            } else {
                // If user not created then return error
                if (result.status === 400) {
                    return apiResponse.conflictRequest(res, result.message, result);
                } else {
                    return apiResponse.notAcceptableRequest(res, result);
                }
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async deActivateUserById(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const userId = req.params.userId;
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return apiResponse.validationErrorWithData(res, "Invalid user id.", {userId: userId});
            }
            const result = await userManager.deActivateUserById(userId,getUserId(req));
            if (result != null && result[0] > 0) {
                return apiResponse.successResponse(
                    res,
                    "User deactivated successfully."
                );
            } else {
                return apiResponse.notAcceptableRequest(
                    res,
                    "User not deactivated."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async getUserProfile(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const userId = req.params.userId;
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return apiResponse.validationErrorWithData(res, "Invalid user id.", {userId: userId});
            }
            const userProfile = await userManager.getUserProfile(userId);
            if (userProfile != null) {
                return apiResponse.successResponseWithData(
                    res,
                    "Get user profile: success.",
                    userProfile
                );
            } else {
                return apiResponse.notFoundResponse(
                    res,
                    "userProfile not found."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async getPropertyByUserId(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const userId = req.params.userId;
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return apiResponse.validationErrorWithData(res, "Invalid user id.", {userId: userId});
            }
            const properties = await userManager.g(userId);
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

    async getAllPropertiesPaginated(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const userId = getUserId(req);
            if (userId <= 0 || userId == null || userId === "" || isNaN(userId)) {
                return apiResponse.validationErrorWithData(res, "Invalid user id.", {userId: userId});
            }
            const paginationData = getPaginationAndFilterDataFromRequest(req);
            const propertiesAndPaginationMetaData = await userManager.getAllPropertiesPaginated(userId, paginationData);
            if (propertiesAndPaginationMetaData != null) {
                return apiResponse.successResponseWithData(
                    res,
                    "Get all properties of user: success.",
                    propertiesAndPaginationMetaData
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

module.exports = { UserController };