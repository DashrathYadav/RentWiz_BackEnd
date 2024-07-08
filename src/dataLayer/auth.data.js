const db = require("../../config/database");
const {authProcs} = require("../helpers/dbProcConst");

/**
 * Auth Data.
 */
class AuthData {
  /**
   * User Login.
   * @param {model} login.validators
   * @returns {Object}
   */
  async userLogin(req) {
    const email = req.body.email;
    const mobileNumber =
      req.body.mobileNumber != undefined ? req.body.mobileNumber : "";
    const procedureName = authProcs.proc_ValidateUser;
    try {
      const user = await db.query(
        `CALL ${procedureName}(:email, :mobileNumber)`,
        {
          replacements: { email, mobileNumber },
          type: db.QueryTypes.RAW,
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validate User.
   * @param {model} login.validators
   * @returns {Object}
   */
  async validateUser(req) {
    const email = req.body.email;
    const mobileNumber = req.body.mobileNumber;
    const procedureName = "proc_ValidateUser";
    try {
      const user = await db.query(
        `CALL ${procedureName}(:email,:mobileNumber)`,
        {
          replacements: { email, mobileNumber },
          type: db.QueryTypes.RAW,
        }
      );
      console.log("user", user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validate User.
   * @param {model} login.validators
   * @returns {Object}
   */
  async registerUser(req, password, confirmOTP) {
    const { firstName, lastName, email, mobileNumber } = req.body;
    const procedureName = "usp_Registration";
    try {
      const user = await db.query(
        `CALL ${procedureName}(:firstName,:lastName, :email, :password, :mobileNumber, :confirmOTP)`,
        {
          replacements: {
            firstName,
            lastName,
            email,
            password,
            mobileNumber,
            confirmOTP,
          },
          type: db.QueryTypes.RAW,
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthData;
