const apiResponse = require("../helpers/apiResponse.js");
const UserManager = require("../manager/user.manager.js");
const {getPaginationAndFilterDataFromRequest} = require("../helpers/utility");
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
            const user = req.body;
            if (user == null || user === "") {
                return apiResponse.validationErrorWithData(res, "Invalid user data.", {user: user});
            }
            const result = await userManager.createUser(user);
            if (result != null && result.status === 201) {
                return apiResponse.successResponse(
                    res,
                    "User created successfully."
                );
            } else {
                return apiResponse.notAcceptableRequest(
                    res,
                    "User not created."
                )
            }
        } catch (error) {
            return apiResponse.expectationFailedResponse(res, error);
        }
    }

    async updateUser(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const user = req.body;
            if (user == null || user === "") {
                return apiResponse.validationErrorWithData(res, "Invalid user data.", {user: user});
            }
            const result = await userManager.updateUser(user);
            if (result != null && result.status === 200) {
                return apiResponse.successResponse(
                    res,
                    "User updated successfully."
                );
            } else {
                return apiResponse.notAcceptableRequest(
                    res,
                    "User not updated."
                )
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
            const result = await userManager.deActivateUserById(userId);
            if (result != null && result.status === 200) {
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
}

module.exports = { UserController };