//const bcrypt = require("bcryptjs");
const UserModel = require("../models/response/outerUserViewModel.js");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer.js");
const utility = require("../helpers/utility.js");
const { emailConst } = require("../helpers/CONSTANTS/constants.js");
const securePassword = require("../helpers/securePassword.js");
const models = require("../../models");
const AuthData = require("../dataLayer/auth.data.js");
const AddressData = require("../dataLayer/address.data.js");
const bcrypt = require("bcryptjs");
const LogManager = require("./log.manager.js");
const logger = require("../helpers/logger.js");
const { log } = require("console");
const userValidation = require("../middlewares/validators/users/userRegistration.validator.js");
const { add } = require("winston");
const e = require("express");
const logManager = new LogManager();
const authData = new AuthData();
const addressData = new AddressData();

class AuthManager {
  /**
   * User Login.
   * @param {model} login.validators
   * @returns {Object}
   */
  async userLogin(req) {
    try {
      let userModel = {};
      let userResult = null;
      if (
        // check if loginId is present in request body. if yes, get user by loginId
        req.body.loginId != null &&
        req.body.loginId != "" &&
        req.body.loginId != undefined
      ) {
        userResult = await authData.getUserByLoginId(req.body.loginId);
      } else if (
        // check if email is present in request body. if yes, get user by email
        req.body.email != null &&
        req.body.email != "" &&
        req.body.email != undefined
      ) {
        userResult = await authData.getUserByEmail(req.body.email);
      } else {
        // get user by mobile number
        userResult = await authData.getUserByMobileNumber(
          req.body.mobileNumber
        );
      }

      //If user exist then check password
      if (userResult && userResult.length > 0) {
        const userData = userResult[0];

        if (userData && userData.password) {
          const same = await bcrypt.compare(
            req.body.password,
            userData.password
          );
          //If password is correct then return user data
          if (same) {
            userData.password = "";
            userModel = userData;
          }
        }
      }
      //logManager.generateAPILog(req, userModel, "", 0);
      return userModel;
    } catch (error) {
      let errorLog = error.name + ": " + error.message;
      logger.error(errorLog);
      logManager.generateAPILog(req, "", errorLog, 1);
      throw error;
    }
  }

  async userRegistration(req) {
    try {
      //check if user already exists for given login ID
      let userResult = null;
      userResult = await authData.getUserByLoginId(req.body.loginId);
      if (userResult && userResult.length > 0) {
        return {
          status: 400,
          message: "User already exists with this login ID",
        };
      }

      //check if user already exists for given email ID
      userResult = await authData.getUserByEmail(req.body.email);
      if (userResult && userResult.length > 0) {
        return {
          status: 400,
          message: "User already exists with this email ID",
        };
      }

      //check if user already exists for given mobile number
      userResult = await authData.getUserByMobileNumber(req.body.mobileNumber);
      if (userResult && userResult.length > 0) {
        return {
          status: 400,
          message: "User already exists with this mobile number",
        };
      }

      //hash the password
      const hashedPassword = await securePassword(req.body.password);

      // Address creation
      const newAddress = {
        street: req.body.street,
        landMark: req.body.landMark,
        area: req.body.area,
        cityId: req.body.cityId,
        pincode: req.body.pincode,
        stateId: req.body.stateId,
        countryId: req.body.countryId,
      };

      //save address in database and get the address data;
      let addressResult = await addressData.createAddress(newAddress);
      const newCreatedAddressId = addressResult[0];
      //If address not created then return error
      if (newCreatedAddressId == null) {
        return {
          status: 400,
          message: "Failed to create address",
        };
      }

      //create new user
      let newUser = {
        loginId: req.body.loginId,
        password: hashedPassword,
        fullName: req.body.fullName,
        mobileNumber: req.body.mobileNumber,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        aadharNumber: req.body.aadharNumber,
        //save picture in some online storage and save the link here
        profilePic: req.body.profilePic,
        //save document in some online storage and save the link here
        document: req.body.document,
        // create a address and store the address id here
        address: newCreatedAddressId,
        roleId: req.body.roleId,
        note: req.body.note,
        isActive: true,
        createdBy: 1,
        lastModifiedBy: 1,
      };

      //save user in database and get the user data;
      let result = await authData.createUser(newUser);
      const newCreateduser = result[0];
      if (newCreateduser) {
        return {
          status: 201,
          message: "User created",
          data: newCreateduser,
        };
      } else {
        return {
          status: 500,
          message: "Internal server error",
        };
      }
    } catch (error) {
      let errorLog = error.name + ": " + error.message;
      logger.error(errorLog);
      logManager.generateAPILog(req, "", errorLog, 1);
      throw error;
    }
  }
}

module.exports = AuthManager;
