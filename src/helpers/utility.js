const xml2js = require('xml2js');

/**
 * File this containts all comment functions.
 */

const mv = require("mv");
const CryptoJS = require("crypto-js");
const config = process.env;

/**
 * Function for generate rendom number.
 * @param {number}      length
 * @returns {number}
 */
exports.randomNumber = function (length) {
    var text = "";
    var possible = "123456789";
    for (var i = 0; i < length; i++) {
        var sup = Math.floor(Math.random() * possible.length);
        text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return Number(text);
};

/**
 * Function for generate token.
 *
 * @returns {String}
 */
exports.generatePasswordToken = function () {
    var length = 10,
        charset =
            "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz",
        password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return String(password);
};

/**
 * Function for Move file.
 *
 * @returns {String}
 */
exports.moveFile = function (sourcePath, destinationPath) {
    mv(sourcePath, destinationPath, function (err) {
        if (err) {
            return err;
        } else {
            return "";
        }
    });
};


/**
 * Function for get pagination object.
 *
 * @returns {Object}
 */
exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: records } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, records, totalPages, currentPage };
};

/**
 * Function for get pagination.
 *
 * @returns {Object}
 */
exports.getPagination = (totalRecords, pageSize, page) => {
    var pageCount = 0;
    var start = 0,
        currentPage = 1;
    pageCount = Math.ceil(totalRecords / pageSize);
    if (typeof page !== "undefined") {
        currentPage = page;
    }
    if (currentPage > 1) {
        start = (currentPage - 1) * pageSize;
    }
    return { totalRecords, currentPage, pageSize, pageCount, start };
};

// Function to generate a random encryption key (32 bytes for AES-256)
exports.generateRandomKey = () => {
    return crypto.randomBytes(32);
};

// Function to encrypt JWT token data
exports.encryptData = (data) => {
    const encData = CryptoJS.AES.encrypt(JSON.stringify(data), config.JWT_SECRET).toString();
    return encData;
};


// Function to decrypt jwt token data
exports.decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, config.JWT_SECRET);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
};

/**
 * Function to convert array of objects to XML.
 *
 * @returns {XML String}
 */
exports.convertToXML = (data) => {
    
    const xmlBuilder = new xml2js.Builder();
    const xmlData = xmlBuilder.buildObject({ data });
    
    return xmlData;
};
