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
      var result = await authManager.userLogin(req);
      if (result != null && result.userId > 0) {
        //If user login success then add bear token in response header
        let token = JwtTokenHelper.getJwtToken({
          userId: result.userId,
          email: result.email,
          roleId: result.roleId,
        });
        res.setHeader("Authorization", token);

        return apiResponse.successResponseWithData(
          res,
          "Login Success.",
          result
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

  /**
   * User Registration.
   * @param {model} user.validators
   * @returns {Object}
   */
  async userRegistration(req, res) {
    try {
      let deviceType = req.headers["device-type"];
      req.body.deviceType = deviceType;

      var result = await authManager.userRegistration(req);

      //If user created succesfully then login user
      if (result.status === 201) {
        //Login user after registration
        return await new AuthController().userLogin(req, res);
      } else {
        // If user not created then return error
        if (result.status == 400) {
          return apiResponse.conflictRequest(res, result);
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
