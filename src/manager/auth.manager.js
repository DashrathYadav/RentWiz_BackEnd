
//const bcrypt = require("bcryptjs");
const UserModel = require("../models/response/outerUserViewModel.js");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer.js");
const utility = require("../helpers/utility.js");
const { emailConst } = require("../helpers/constants.js");
const securePassword = require("../helpers/securePassword.js");
const models = require('../../models')
const AuthData = require("../dataLayer/auth.data.js");
const bcrypt = require("bcryptjs");
const  LogManager  = require("./log.manager.js");
const logger = require("../helpers/logger.js");
const { log } = require("console");
const logManager = new LogManager();
const authData = new AuthData();


class AuthManager {
	/**
	 * User Login.
	 * @param {model} login.validators
	 * @returns {Object}
	 */
	async userLogin(req) {
		try {
			let userModel = {};
			const userRes = await authData.userLogin(req);
			if (userRes && userRes.length > 0) {
				const userData = userRes[0];
				
				if (userData && userData.password) {
					const same = await bcrypt.compare(
						req.body.password,
						userData.password
					);
					if (same) {
						let data = {
							userID: userData.userID,
						};
						const jwtPayload = data;
						const jwtData = {
							expiresIn: process.env.JWT_TIMEOUT_DURATION,
						};
						const secret = process.env.JWT_SECRET;
						//Generated JWT token with Payload and secret.
						userData.token = utility.encryptData(
							jwt.sign(jwtPayload, secret, jwtData)
						);
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
		}
	}

	/**
	 * User Registration.
	 * @param {model} user.validators
	 * @returns {Object}
	 */
	async userRegistration(req) {
		try {
			var userModel = new UserModel();
			const userRes = await authData.validateUser(req);
            // console.log("hello12",userRes);
			if (userRes.length == 0) {
				const hashedPassword = await securePassword(req.body.password);
				let otp = utility.randomNumber(4);

				// let html =
				// 	"<p>Please Confirm your Account. OTP is valid till 10 minutes.</p><p>OTP: " +
				// 	otp +
				// 	"</p>";
				// await mailer
				// 	.send(
				// 		emailConst.confirmEmails.from,
				// 		req.body.email,
				// 		"Confirm Account",
				// 		html
				// 	)
				// 	.then(async function (result) {
						const user = await authData.registerUser(req, hashedPassword, otp);
						userModel = user[0];
					// });

				//const user = await authData.registerUser(req, hashedPassword, otp);
				//userModel = user[0];
			} else {
				userModel = userRes[0];
			}
			//logManager.generateAPILog(req, userModel, "", 0);
			return userModel;
		} catch (error) {
			let errorLog = error.name + ": " + error.message;
			logger.error(errorLog);
			logManager.generateAPILog(req, "", errorLog, 1);
		}
	}
}

module.exports = AuthManager;
