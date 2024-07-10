"use strict";
const { enc } = require("crypto-js");
const jwt = require("jsonwebtoken");
const utility = require("./utility");

class JwtTokenHelper {
  // Generate a JWT token using the payload and secret
  // Return the generated token
  static generateToken(payload) {
    const jwtData = {
      expiresIn: process.env.JWT_TIMEOUT_DURATION,
    };
    const secret = process.env.JWT_SECRET;
    //Generated JWT token with Payload and secret.
    const token = jwt.sign(payload, secret, jwtData);
    // Encrypt the token before returning it
    let encryptedToken = utility.encryptData(token);
    return encryptedToken;
  }

  static getJwtToken = (payload) => {
    return JwtTokenHelper.generateToken(payload);
  };

  static verifyToken(token, secret) {
    // Verify the JWT token using the secret
    // Return true if the token is valid, false otherwise
  }
}

module.exports = JwtTokenHelper;
