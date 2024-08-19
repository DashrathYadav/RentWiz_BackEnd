const apiResponse = require("../helpers/apiResponse.js");
const JwtTokenHelper = require("../helpers/getJwtToken.js");
const AuthManager = require("../manager/auth.manager.js");
const authManager = new AuthManager();

class AuthController {
  /**
   * User Login.
   * @param {model} login.validators
   * @returns {Object}
   */
  async userLogin(req, res) {
    try {
      let deviceType = req.headers["device-type"];
      req.body.deviceType = deviceType;
      var user = await authManager.userLogin(req);
      if (user != null && user.userId > 0) {
        //If user login success then add bear token in response header
        await authManager.addJwtToken(res, user);
        return apiResponse.successResponseWithData(
            res,
            "Login Success.",
            user
        );
      } else {
        return apiResponse.unauthorizedResponse(
            res,
            "loginId or Password wrong."
        );
      }
    } catch (error) {
      return apiResponse.expectationFailedResponse(res, error);
    }
  }

  async userRegistration(req, res) {
    try {
      let deviceType = req.headers["device-type"];
      req.body.deviceType = deviceType;

      var result = await authManager.userRegistration(req);

      //If user created successfully then login user
      if (result.status === 201) {
        return apiResponse.successResponse(res, "User registered successfully.");
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
}

module.exports = { AuthController };
