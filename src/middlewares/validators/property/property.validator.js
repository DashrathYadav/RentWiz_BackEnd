
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
    propertyStatus: joi.number().empty(),
    propertyPic: joi.string().empty(),
    propertyDescription: joi.string().empty(),
    propertyFacility: joi.string().empty(),
    ownerId: joi.number().integer().required().empty().messages({
        "number.empty": `{#key} cannot be an empty field`,
        "number.integer": `{#key} must be an integer`,
        "any.required": `{#key} is a required field`,
    }),
    note: joi.string().empty(),
    });

const propertyValidation = async (req, res, next) => {
    try {
        const value = await validation.validateAsync(req.body);
        next();
    } catch (error) {
        return apiResponse.validationErrorWithData(
            res,
            "Validation Error.",
            error.details[0].message
        );
    }

}
