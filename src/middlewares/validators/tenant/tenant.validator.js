
//property validator
const joi = require("joi");
const apiResponse = require("../../../helpers/apiResponse");

const validation = joi.object({
    tenantName: joi
        .string()
        .trim(true)
        .required()
        .empty()
        .messages({
            "string.empty": `{#key} cannot be an empty field`,
            "any.required": `{#key} is a required field`,
        }),
    tenantMobile: joi.string().empty().required().length(10).pattern(/[6-9]{1}[0-9]{9}/).message({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
        "string.length": `{#key} length must be {{#limit}} characters long`,
    }),
    tenantEmail: joi.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).message({
        "string.email": `{#key} must be a valid email`
    }),
    tenantAdhar: joi.string().empty().required().length(12).pattern(/[0-9]{12}/).message({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
        "string.pattern.base": `{#key} must match the specified pattern`
    }),
    tenantProfilePic: joi.string().empty(),
    tenantDocument: joi.string().empty(),
    tenantRoomNo: joi.number().integer().empty().required.message({
        "number.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
        "number.integer": `{#key} must be an integer`
    }),
    isActive: joi.boolean().default(true),
    lockInPeriod: joi.string().empty().required().message({
        "string.empty": `{#key} cannot be an empty field`,
        "any.required": `{#key} is a required field`,
    }),
    note: joi.string().empty(),
    deposited: joi.number().precision(4),
    returnDeposite: joi.number().precision(4),
    boardingDate: joi.date().empty().required().message({
        'any.required': 'Date is required.',
        "date.empty": `{#key} cannot be an empty field`,
    }),
    leavingDate: joi.date(),
    userId: joi.number().integer().required().empty().messages({
        "number.empty": `{#key} cannot be an empty field`,
        "number.integer": `{#key} must be an integer`,
        "any.required": `{#key} is a required field`,
    }),
    propertyId: joi.number().integer().required().empty().messages({
        "number.empty": `{#key} cannot be an empty field`,
        "number.integer": `{#key} must be an integer`,
        "any.required": `{#key} is a required field`,
    }),
    roomId: joi.number().integer().required().empty().messages({
        "number.empty": `{#key} cannot be an empty field`,
        "number.integer": `{#key} must be an integer`,
        "any.required": `{#key} is a required field`,
    }),
});

const tenantValidation = async (req, res, next) => {
    try {
        const tenant = req.body.tenant;
        const payload = {
            tenantName: tenant.tenantName,
            tenantMobile: tenant.tenantMobile,
            tenantEmail: tenant.tenantEmail,
            tenantAdhar: tenant.tenantAdhar,
            tenantProfilePic: tenant.tenantProfilePic,
            tenantDocument: tenant.tenantDocument,
            permanentAddressId: tenant.permanentAddressId,
            addressId: tenant.addressId,
            tenantRoomNo: tenant.tenantRoomNo,
            isActive: tenant.isActive,
            lockInPeriod: tenant.lockInPeriod,
            note: tenant.note,
            deposited: tenant.deposited,
            returnDeposite: tenant.returnDeposite,
            boardingDate: tenant.boardingDate,
            leavingDate: tenant.leavingDate,
            userId: tenant.userId,
            propertyId: tenant.propertyId,
            roomId: tenant.roomId,
        };
        const { error } = validation.validate(payload);
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

module.exports = tenantValidation;
