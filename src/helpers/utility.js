const xml2js = require("xml2js");

/**
 * File this containts all comment functions.
 */

const mv = require("mv");
const CryptoJS = require("crypto-js");
const logger = require("./logger");
const {generateAPILog} = require("../manager/log.manager");
const config = process.env;
const { Op } = require('sequelize');
const {maxPageSize, defaultPageSize, defaultPageNumber, Order} = require("./CONSTANTS/constants");
const {StatusCodes} = require("http-status-codes");
const {
    validationErrorWithData,
    notFoundResponse,
    unauthorizedResponse,
    notAcceptableRequest,
    forbiddenRequest,
    ErrorResponse, conflictRequest
} = require("./apiResponse");

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
    text += i > 0 && sup === i ? "0" : possible.charAt(sup);
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
  const encData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.JWT_SECRET
  ).toString();
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

// get curent user id
exports.getUserId = (req) => {
  return req.user.userId;
};

//log error
exports.logError = (error) => {
  let errorLog = error.name + ": " + error.message;
  logger.error(errorLog);
  generateAPILog(req, "", errorLog, 1);
};


 exports.getSanitizedPaginationAndFilterCondition = (options = {}) => {
  let {
      pageNumber = 1,
      pageSize = 10,
      filterContains = '',
      filterStartsWith = '',
      filterFields = [],
      orderBy = 'ASC',
  } = options;

   pageSize = parseInt(pageSize, 10);
   pageNumber = parseInt(pageNumber, 10);

   //sanitize pageNumber and pageSize
   pageNumber = isNaN(pageNumber) ? defaultPageNumber : pageNumber;
    pageSize = isNaN(pageSize) ? defaultPageSize : pageSize;
    filterFields = Array.isArray(filterFields) ? filterFields : [filterFields];
    orderBy = Order.get(orderBy) || Order.get('asc');

   //default PageNumber
   if(pageNumber < 1) {
     pageNumber = defaultPageNumber;
   }

   //default PageSize
   if(pageSize < 1) {
     pageSize = defaultPageSize;
   }

    //max PageSize
   if(pageSize > maxPageSize) {
     pageSize = maxPageSize;
   }


  const filterCondition = [];

  if (filterContains) {
    filterFields.forEach(field => {
        if(field !== '' || field !== undefined) {
            filterCondition.push({[field]: {[Op.like]: `%${filterContains}%`}});
        }
    });
  }

  if (filterStartsWith) {
    filterFields.forEach(field => {
        if(field !== '' || field !== undefined) {
            filterCondition.push({[field]: {[Op.like]: `${filterStartsWith}%`}});
        }
    });
  }

  return {
      _pageSize: pageSize,
      _pageNumber: pageNumber,
      _condition: filterCondition.length > 0 ? {[Op.or]: filterCondition} : {},
      _orderBy : orderBy
  }
};


 exports.getPaginationAndFilterDataFromRequest=(req)=> {
     const pageSize = req.query.pageSize;
     const pageNumber = req.query.pageNumber;
     const filterStartsWith = req.query.filterStartsWith;
     const filterContains = req.query.filterContains;
     const filterFields = req.query.filterFields;
     const orderBy = req.query.orderBy;
     const orderByField = req.query.orderByField;

     return {
         pageSize,
         pageNumber,
         filterStartsWith,
         filterContains,
         filterFields,
         orderBy,
         orderByField
     };
 }


 exports.getPaginationMetaData =  (result,_pageSize,_pageNumber) => {
        const totalRecords = result.count;
        const totalPages = Math.ceil(totalRecords / _pageSize);
     return {
            pageSize: _pageSize,
            pageNumber: _pageNumber,
            totalRecords: totalRecords,
            totalPages: totalPages,
        };

 }

 exports.IsNullOrEmpty = (value) => {
    return value === undefined || value === null || value === '' || value=== "";
 }

 exports.IsNullOrWhiteSpace = (value) => {
    return value === undefined || value === null || value.trim() === '' || value.trim() === "";
 }

 exports.IsInteger = (value) => {
    return !isNaN(parseInt(value, 10));
 }

 exports.IsLong = (value) => {
    return value === parseInt(value, 10);
 }

exports.ApiErrorResponse = function (res,error)
{
    if(error.statusCode && error.statusCode >=400 && error.statusCode<500)
    {
        switch (error.statusCode)
        {
            case StatusCodes.BAD_REQUEST:
                validationErrorWithData(res,error.message,error.data)
                break;
            case StatusCodes.NOT_FOUND:
                notFoundResponse(res,error.message)
                break;
            case StatusCodes.UNAUTHORIZED:
                unauthorizedResponse(res,error.message)
                break;
            case StatusCodes.NOT_ACCEPTABLE:
                notAcceptableRequest(res,error.message)
                break;
            case StatusCodes.FORBIDDEN:
                forbiddenRequest(res,error.message)
                break;
            case StatusCodes.CONFLICT:
                conflictRequest(res,error.message,error.data)
                break;
            default:
                validationErrorWithData(res,error.message,error.data)
        }
    }
    else{
        ErrorResponse(res,error.message)
    }
}