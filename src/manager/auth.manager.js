//const bcrypt = require("bcryptjs");
const UserModel = require("../models/response/outerUserViewModel.js");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer.js");
const utility = require("../helpers/utility.js");
const { emailConst } = require("../helpers/CONSTANTS/constants.js");
const securePassword = require("../helpers/securePassword.js");
const models = require("../../models");
const AuthData = require("../dataLayer/auth.data.js");
const AddressManager = require("../manager/address.manager");
const UserManager = require("../manager/user.manager");
const bcrypt = require("bcryptjs");
const LogManager = require("./log.manager.js");
const logger = require("../helpers/logger.js");
const { log } = require("console");
const userValidation = require("../middlewares/validators/users/userRegistration.validator.js");
const { add } = require("winston");
const e = require("express");
const JwtTokenHelper = require("../helpers/getJwtToken");
const {tokenKey} = require("../helpers/CONSTANTS/constants");
const logManager = new LogManager();
const authData = new AuthData();
const addressManager = new AddressManager();
const userManager = new UserManager();

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
          req.body.loginId !== "" &&
          req.body.loginId !== undefined
      ) {
        userResult = await userManager.getUserByLoginId(req.body.loginId);
      } else if (
          // check if email is present in request body. if yes, get user by email
          req.body.email != null &&
          req.body.email !== "" &&
          req.body.email !== undefined
      ) {
        userResult = await userManager.getUserByEmail(req.body.email);
      } else {
        // get user by mobile number
        userResult = await userManager.getUserByMobileNumber(
            req.body.mobileNumber
        );
      }

      //If user exist then check password
      if (userResult) {
        const userData = userResult;

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
      await logManager.generateAPILog(req, "", errorLog, 1);
      throw error;
    }
  }

  async userRegistration(req) {
    try {
      const user = req.body.user;
      const address = req.body.address;

      //sanitizing the input.
      if (user == null || user === "" || user === undefined) {
        return {
          status: 400,
          message: "Invalid user data",
        };
      }

      if (address == null || address === "" || address === undefined) {
        return {
          status: 400,
          message: "Invalid address data",
        };
      }

      //check if user already exists for given login ID
      let userResult = null;
      userResult = await userManager.getUserByLoginId(user.loginId);
      if (userResult != null){
        return {
          status: 400,
          message: "User already exists with this login ID",
        };
      }

      //check if user already exists for given email ID
      userResult = await userManager.getUserByEmail(user.email);
      if (userResult != null) {
        return {
          status: 400,
          message: "User already exists with this email ID",
        };
      }

      //check if user already exists for given mobile number
      userResult = await userManager.getUserByMobileNumber(user.mobileNumber);
      if (userResult != null) {
        return {
          status: 400,
          message: "User already exists with this mobile number",
        };
      }

      //hash the password
      const hashedPassword = await securePassword(user.password);

      // Address creation
      const newAddress = {
        street: address.street,
        landMark: address.landMark,
        area: address.area,
        cityId: address.cityId,
        pincode: address.pincode,
        stateId: address.stateId,
        countryId: address.countryId,
      };

      //save address in database and get the address data;
      let addressResult = await addressManager.createAddress(newAddress);
      const newCreatedAddressId = addressResult.addressId;
      //If address not created then return error
      if (newCreatedAddressId == null) {
        return {
          status: 400,
          message: "Failed to create address",
        };
      }

      //create new user
      let newUser = {
        loginId: user.loginId,
        password: hashedPassword,
        fullName: user.fullName,
        mobileNumber: user.mobileNumber,
        phoneNumber: user.phoneNumber,
        email: user.email,
        aadharNumber: user.aadharNumber,
        //save picture in some online storage and save the link here
        profilePic: user.profilePic,
        //save document in some online storage and save the link here
        document: user.document,
        // create a address and store the address id here
        addressId: newCreatedAddressId,
        roleId: user.roleId,
        note: user.note,
        isActive: true,
        createdBy: 1,
        lastModifiedBy: 1,
        creationDate: new Date(),
        lastModifiedDate: new Date(),
      };

      //save user in database and get the user data;
      const newCreateduser = await userManager.createUser(newUser);
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
      await logManager.generateAPILog(req, "", errorLog, 1);
      throw error;
    }
  }

  async addJwtToken(res, user) {
    let token = JwtTokenHelper.getJwtToken({
      userId: user.userId,
      email: user.email,
      roleId: user.roleId,
    });
    res.setHeader(tokenKey, token);
  }
}

module.exports = AuthManager;
