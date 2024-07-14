const apiResponse = require("../helpers/apiResponse.js");
const { UserManager} = require("../manager/user.manager.js");
const userManager = new UserManager();
class UserController {

    //get user profile
    async getProfile(req, res) {
        try {
            let deviceType = req.headers["device-type"];
            req.body.deviceType = deviceType;
            const user = await userManager.getProfile(req.userId);
            if (user != null && user.userID > 0) {
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
}

module.exports = { UserController };