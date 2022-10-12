const { body, validationResult } = require("express-validator");
const statusMessage = require("../config/status-message");
const statusCodes = require("../config/status-codes");

/**
 * check value is between 0 to 255 
 * 
 * @param {*} value 
 * @returns boolean
 */
const checkLength = (value) => value.length >= 1 && value.length <= 255;

/**
 * Validate the email is exist in body and a valid email
 * @param {String} field 
 */
const validateIfEmailId = (field) => body(field)
    .exists()
    .withMessage(statusMessage.EMAIL_NOT_FOUND)
    .isEmail()
    .withMessage(statusMessage.INVALID_EMAIL);

/**
 * validate field exists or not in body
 * 
 * @param {String} field 
 * @param {String} message
 */
const validateIfExist = (field, message) => body(field).exists().withMessage(message);

/**
 * validate field exist or not in body and length of value must be between 0 to 255
 * 
 * @param {String} field 
 * @param {String} message1 
 * @param {String} message2 
 */
const validateIfEmpty = function (field, message1, message2 = "") {
    return body(field)
        .exists()
        .withMessage(message1)
        .custom(checkLength)
        .withMessage(message2 || message1);
};

/**
 * Function is a middleware to check the error validations in request object
 * 
 * @param {*} _req 
 * @param {*} _res 
 * @param {*} _next 
 * @returns 
 */
const validateResponse = (_req, _res, _next) => {
    const errors = validationResult(_req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
        return _res.status(statusCodes.HTTP_UNPROCESSABLE_ENTITY).send({
            code: "ERR_SYSTEM",
            return_code: 1025,
            errors: errors.array({ onlyFirstError: true })
        });
    }
    return _next();
};

module.exports = {
    validateIfExist,
    validateIfEmpty,
    validateIfEmailId,
    validateResponse
};
