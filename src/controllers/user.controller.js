const apiResponse = require("../helpers/apiResponse.js");
const CommonManager = require("../manager/common.manager.js");
const commonManager = new CommonManager();

class UserController {

    //get user profile
    async getProfile(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            var result = await commonManager.getUserInfo(req.UserId);
            if (result != null && result.userID > 0) {
                return apiResponse.successResponseWithData(
                    res,
                    "Get user profile: success.",
                    result
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
}

module.exports = { UserController };