const joi = require("joi");
const apiResponse = require("../../helpers/apiResponse");
const { addressPattern } = require("../../helpers/CONSTANTS/CustomRegexConst");

const Validation = joi.object({
  street: joi.string().pattern(addressPattern).empty().messages({
    "string.base": `{#key} should be a type of text`,
    "string.empty": `{#key} cannot be an empty field`,
    "string.pattern.base": "Invalid {#key} name",
  }),
  landMark: joi.string().pattern(addressPattern).required().messages({
    "string.base": `{#key} should be a type of text`,
    "string.empty": `{#key} cannot be an empty field`,
    "string.pattern.base": "Invalid {#key} name",
  }),
  area: joi.string().pattern(addressPattern).required().messages({
    "string.base": `{#key} should be a type of text`,
    "string.empty": `{#key} cannot be an empty field`,
    "string.pattern.base": "Invalid {#key} name",
  }),
  cityId: joi.number().integer().required().messages({
    "number.base": `cityId should be a type of number`,
    "number.empty": `cityId cannot be an empty field`,
    "any.required": `cityId is a required field`,
  }),
  pincode: joi.number().integer().required().messages({
    "number.base": `pincode should be a type of number`,
    "number.empty": `pincode cannot be an empty field`,
    "any.required": `pincode is a required field`,
  }),
  stateId: joi.number().integer().required().messages({
    "number.base": `stateId should be a type of number`,
    "number.empty": `stateId cannot be an empty field`,
    "any.required": `stateId is a required field`,
  }),
  countryId: joi.number().integer().required(),
});

const addressValidation = async (req, res, next) => {
  try {
    const payload = {
      street: req.body.street,
      landMark: req.body.landMark,
      area: req.body.area,
      cityId: req.body.cityId,
      pincode: req.body.pincode,
      stateId: req.body.stateId,
      countryId: req.body.countryId,
    };

    const { error } = Validation.validate(payload);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = addressValidation;
