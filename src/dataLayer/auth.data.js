const { compareSync } = require("bcryptjs");
const db = require("../../config/database");
const authProcs = require("../helpers/dbProcConst");
const Table = require("../helpers/tableNameConst");

/**
 * Auth Data.
 */
class AuthData {
  /**
   * Get User by Email.
   * @param {String} email
   * @returns {Object}
   */
  async getUserByEmail(email) {
    //use sql query to get user by email
    try {
      let userTable = Table.USERS;
      const user = await db.query(
        `SELECT * FROM ${Table.USERS} WHERE email = :email`,
        {
          replacements: { email },
          type: db.QueryTypes.SELECT,
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get User by Mobile Number.
   * @param {String} mobileNumber
   * @returns {Object}
   * */
  async getUserByMobileNumber(mobileNumber) {
    //use sql query to get user by mobile number
    try {
      const user = await db.query(
        `SELECT * FROM ${Table.USERS} WHERE mobileNumber = :mobileNumber`,
        {
          replacements: { mobileNumber },
          type: db.QueryTypes.SELECT,
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get User by Login Id.
   * @param {String} loginId
   * @returns {Object}
   * */
  async getUserByLoginId(loginId) {
    //use sql query to get user by login id
    let userTable = Table.USERS;
    try {
      const user = await db.query(
        `SELECT * FROM ${Table.USERS} WHERE loginId = :loginId`,
        {
          replacements: { loginId },
          type: db.QueryTypes.SELECT,
        }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create User.
   * @param {Object} user
   * @returns {Object}
   * */
  async createUser(user) {
    try {
      const {
        loginId,
        password,
        fullName,
        mobileNumber,
        phoneNumber,
        email,
        aadharNumber,
        profilePic,
        document,
        address,
        roleId,
        note,
        isActive,
        createdBy,
        lastModifiedBy,
        creationDate,
        lastModificationdDate,
      } = user;
      // sql query to insert user
      const result = await db.query(
        ` INSERT INTO ${Table.USERS} (loginId, password, fullName, mobileNumber, phoneNumber, email, aadharNumber, profilePic, document, address, roleId, note, isActive, createdBy, lastModifiedBy)
          VALUES (:loginId, :password, :fullName, :mobileNumber, :phoneNumber, :email, :aadharNumber, :profilePic, :document, :address, :roleId, :note, :isActive, :createdBy, :lastModifiedBy)`,
        {
          replacements: {
            loginId,
            password,
            fullName,
            mobileNumber,
            phoneNumber,
            email,
            aadharNumber,
            profilePic,
            document,
            address,
            roleId,
            note,
            isActive,
            createdBy,
            lastModifiedBy,
          },
          type: db.QueryTypes.INSERT,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthData;
