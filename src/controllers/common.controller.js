
const { log } = require("console");
const apiResponse = require("../helpers/apiResponse");
const CommonManager = require("../manager/common.manager");
const commonManager = new CommonManager();







class CommonController {

async getProfile(req, res) {
    try {
      let deviceType = req.headers["device-type"];
      req.body.deviceType = deviceType;
      var result = await commonManager.getUserInfo(req);
      if (result != null && result.userID > 0) {
        return apiResponse.successResponseWithData(
          res,
          "Token verified.",
          result
        );
      } else {
        return apiResponse.forbiddenRequest(
          res,
          "Error while verifying the user."
        );
      }
    } catch (error) {
      return apiResponse.expectationFailedResponse(res, error);
    }
  }

  async getProperty(req, res) {
    try {
     
     
      var result = await commonManager.getProperty(req);
      if (result) {
        return apiResponse.successResponseWithData(
          res,
          "Get Property fetched succesfully",
          result
        );
      } else {
        return apiResponse.forbiddenRequest(
          res,
          "Error while fetching Data"
        );
      }
    } catch (error) {
      return apiResponse.expectationFailedResponse(res, error);
    }
  }


}

module.exports = { CommonController };