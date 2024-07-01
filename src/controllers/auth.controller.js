const apiResponse = require("../helpers/apiResponse.js");
const AuthManager = require('../manager/auth.manager.js')
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
			if (result != null && result.userID > 0) {
				if (result.isConfirm && result.isActive) {
					let data= {
						userID: result.userID,
						firstName: result.firstName,
						lastName: result.lastName,
						email: result.email,
						mobileNumber: result.mobileNumber,
						token: result.token
					};
					return apiResponse.successResponseWithData(res, "Login Successfully.", data);
				} else if (result.userID > 0 && !result.isConfirm) {
					return apiResponse.unauthorizedResponse(res, "Account is not confirmed. Please confirmed your account.");
				} else if (result.userID > 0 && !result.isActive) {
					return apiResponse.unauthorizedResponse(res, "Account is not active. Please contact admin.");
				}
			} else {
				return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
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

            
			if (result != null) {
				if (result.userID > 0) {
					return apiResponse.conflictRequest(res, "User Already Exists.");
				} else {
					return apiResponse.successResponseWithData(res, "Registration Success.", result);
				}
			} else {
				return apiResponse.forbiddenRequest(res, "Error while registeting user.");
			}
		} catch (error) {
			return apiResponse.expectationFailedResponse(res, error);
		}
	}
}

module.exports = { AuthController };
