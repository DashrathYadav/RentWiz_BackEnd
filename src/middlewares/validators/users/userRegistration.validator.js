const joi = require("joi");
const apiResponse = require("../../../helpers/apiResponse");

const validation = joi.object({
  loginId: joi
    .string()
    .alphanum()
    .min(3)
    .max(25)
    .trim(true)
    .required()
    .empty()
    .messages({
      "string.empty": `{#key} cannot be an empty field`,
      "string.alphanum": `{#key} must only contain alpha-numeric characters`,
      "any.required": `{#key} is a required field`,
      "string.min": `{#key} length must be at least {{#limit}} characters long`,
      "string.max": `{#key} length must be less than or equal to {{#limit}} characters long`,
    }),
  password: joi
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .trim(true)
    .required()
    .empty()
    .messages({
      "string.empty": `{#key} cannot be an empty field`,
      "any.required": `{#key} is a required field`,
      "string.pattern.base": `{#key} must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long`,
    }),
  newPassword: joi
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .trim(true)
    .messages({
      "string.pattern.base": `{#key} must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long`,
    }),
  fullName: joi
    .string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(3)
    .max(25)
    .trim(true)
    .required()
    .empty()
    .messages({
      "string.empty": `{#key} cannot be an empty field`,
      "string.pattern.base": `{#key} must only contain alphabetic characters`,
      "any.required": `{#key} is a required field`,
      "string.min": `{#key} length must be at least {{#limit}} characters long`,
      "string.max": `{#key} length must be less than or equal to {{#limit}} characters long`,
    }),
  mobileNumber: joi
    .string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .empty()
    .required()
    .messages({
      "string.empty": `{#key} cannot be an empty field`,
      "any.required": `{#key} is a required field`,
      "string.length": `{#key} length must be {{#limit}} characters long`,
    }),
  phoneNumber: joi
    .string()
    .length(10)
    .pattern(/[0-9]{10}/)
    .empty()
    .messages({
      "string.empty": `{#key} cannot be an empty field`,
      "string.length": `{#key} length must be {{#limit}} characters long`,
    }),
  email: joi
    .string()
    .email()
    .empty()
    .trim(true)
    .required()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      "string.empty": `{#key} cannot be an empty field`,
      "any.required": `{#key} is a required field`,
      "string.email": `{#key} must be a valid email`,
      "string.pattern.base": `{#key} must match the specified pattern`,
    }),
  aadharNumber: joi
    .string()
    .length(12)
    .pattern(/[0-9]{12}/)
    .empty()
    .messages({
      "string.empty": `{#key} cannot be an empty field`,
      "string.length": `{#key} length must be {{#limit}} characters long`,
      "string.pattern.base": `{#key} must match the specified pattern`,
    }),
  profilePic: joi.string().empty(),
  document: joi.string().empty(),
  roleId: joi.number().integer().required().empty().messages({
    "number.empty": `{#key} cannot be an empty field`,
    "number.integer": `{#key} must be an integer`,
    "any.required": `{#key} is a required field`,
  }),
  note: joi.string().empty(),
  isActive: joi.boolean().default(false),
});

const userValidation = async (req, res, next) => {
  const user = req.body.user;
    const payload = {
    loginId: user.loginId,
    password: user.password,
    newPassword: user.newPassword,
    fullName: user.fullName,
    mobileNumber: user.mobileNumber,
    phoneNumber: user.phoneNumber,
    email: user.email,
    aadharNumber: user.aadharNumber,
    profilePic: user.profilePic,
    document: user.document,
    roleId: user.roleId,
    note: user.note,
    isActive: user.isActive,
  };

  const { error } = validation.validate(payload);
  if (error) {
    return apiResponse.notAcceptableRequest(res, `${error.message}`);
  } else {
    next();
  }
};

module.exports = userValidation;
