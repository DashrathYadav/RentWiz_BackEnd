
//property validator
const joi = require("joi");
const apiResponse = require("../../../helpers/apiResponse");

const validation = joi.object({
    propertyName: joi
        .string()
        .trim(true)
        .required()
        .empty()
        .messages({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
        }),
    propertyType: joi.string().empty(),
    propertySize: joi.string().empty(),
    propertyRent: joi.number().empty(),
    currencyId: joi.number().integer().required().empty().messages({
        "number.empty": `{#key} cannot be an empty field`,
        "number.integer": `{#key} must be an integer`,
        "any.required": `{#key} is a required field`,
    }),
    propertyStatus: joi.number().integer().empty().messages({
        "number.empty": `{#key} cannot be an empty field`,
        "number.integer": `{#key} must be an integer`,
    }),
    propertyPic: joi.string().empty(),
    propertyDescription: joi.string().empty(),
    propertyFacility: joi.string().empty(),
    userId: joi.number().integer().required().empty().messages({
        "number.empty": `{#key} cannot be an empty field`,
        "number.integer": `{#key} must be an integer`,
        "any.required": `{#key} is a required field`,
    }),
    note: joi.string().empty(),
    });

const propertyValidation = async (req, res, next) => {
    try {
        const property = req.body.property;
        const payload = {
            propertyName: property.propertyName,
            propertyType: property.propertyType,
            propertySize: property.propertySize,
            propertyRent: property.propertyRent,
            currencyId: property.currencyId,
            propertyStatus: property.propertyStatus,
            propertyPic: property.propertyPic,
            propertyDescription: property.propertyDescription,
            propertyFacility: property.propertyFacility,
            userId: property.userId,
            note: property.note,
        };
        const {error} = validation.validate(payload);
        if (error) {
            return apiResponse.validationErrorWithData(
                res,
                "Validation Error.",
                error.message
            );
        } else {
            next();
        }
    } catch (error) {
        return apiResponse.validationErrorWithData(
            res,
            "Validation Error.",
            error.message
        );
    }
};

module.exports = propertyValidation;
