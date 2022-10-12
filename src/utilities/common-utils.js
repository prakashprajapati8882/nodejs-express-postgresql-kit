const { validationResult } = require("express-validator");
const crypto = require("crypto");
const { HTTP_UNPROCESSABLE_ENTITY } = require("../config/status-codes");
const { BaseError } = require("../services/error-class");
const logger = require("../logger/logger");

/**
 * This Function is used to return some random string of size(default is 10).
 *
 * @param {Number} size
 * @returns
 */
const generateRandomString = function (size = 10) {
    return crypto.randomBytes(size).toString("hex").slice(0, size);
};

/**
 * This Function is used to get the ip address from the request Object
 * @param {*} req
 * @returns
 */
const getIpAddress = function (req) {
    const ipaddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;
    return ipaddress && ipaddress.split(",").length > 0
        ? ipaddress.split(",")[0]
        : ipaddress;
};

/**
 * Function to create a Unique array from an array
 * 
 * @param {Array} array - List of elements
 * @returns array - list of unique elements
 */
const getUniqueArray = function (array) {
    return [...new Set(array)];
};

/**
 * Function is used to convert plain text to base64
 *
 * @param {String} text
 * @returns string
 */
const textToBase64 = function (text = "") {
    return Buffer.from(text).toString("base64");
};

/**
 * Function is used to convert from base64 to plain text
 *
 * @param {String} base64Text
 * @returns string
 */
const base64ToText = function (base64Text = "") {
    return Buffer.from(base64Text, "base64").toString();
};
/**
 * Function is used to remove key-pair from an object
 * 
 * @param {Array} keys - An array of keys 
 * @param {Object} object - An object
 * @returns object - A filtered object of removed keys
 */
const omitKeyFromObject = (keys, object) => Object.fromEntries(
    Object.entries(object)
        .filter(([k]) => !keys.includes(k))
);

/**
 * Function to add a new key-pair in an object
 * @param {Object} keys - An object of key-value pairs to be added
 * @param {Object} object - An object to which values to be added
 * @returns object - A object withb added key-value pairs
 */
const extend = (existingData, newData) => Object.assign(existingData, newData);

/**
 * Function to find the different elements in 2 arrays
 * @param {Array} firstArray
 * @param {Array} secondArray
 * @returns array
 */
const arrayDifference = (array1, array2) => {
    const arrays = [array1, array2];
    return arrays.reduce((a, b) => a.filter((c) => !b.includes(c)));
};
/**
 * Function to find whether the given 2 arrays are equal
 * @param {Array} array1
 * @param {Array} array2  
 * @returns boolean
 */
const isEqualArray = (array1, array2) => {
    if (array1.length !== array2.length) return false;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
};

/**
 * Function to get the past date as per the desired parameter
 * @param {Number/String} numericValue - day difference from current date to old date
 * @returns date
 */
const getOldDate = function (oldDate = 7) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - oldDate);
    return currentDate.setHours(0, 0, 0, 0);
};

/**
 * Function to get the past date as per the desired parameter
 * @param {Number/String} numericValue - password salt length
 * @returns the hash of salt
 */
function makePasswordSalt(length) {
    return crypto
        .randomBytes(length)
        .toString("hex") /* convert to hexadecimal format */
        .slice(0, length);/* return required number of characters */
}

/**
 * Function to get the past date as per the desired parameter
 * @param {String} searchItem 
* @param {Object} condition 
 * @param {String} searchColumn 
 * @returns Object
 */
const filterByTime = (searchItem, condition, searchColumn) => {
    const getTimeLimits = searchItem.split(" ");
    const lowerTimeLimit = new Date(parseInt(getTimeLimits[3], 10));
    const upperTimeLimit = new Date(parseInt(getTimeLimits[1], 10));
    if (lowerTimeLimit && upperTimeLimit) {
        if (searchColumn === "updatedAt") {
            condition.where[OP.or] = [{
                [OP.and]: [
                    { updatedAt: { [OP.gte]: lowerTimeLimit } },
                    { updatedAt: { [OP.lte]: upperTimeLimit } }]
            },
            {
                [OP.and]: [
                    { createdAt: { [OP.gte]: lowerTimeLimit } },
                    { createdAt: { [OP.lte]: upperTimeLimit } }
                ]
            }
            ];
        }
    }
    return condition;
};

/**
 * Function to handle Promises
 * @param {} promiseIns 
 * @returns Object
 */
const handlePromise = (promiseIns) => (promiseIns
    ? promiseIns
        .then((result) => [result, null])
        .catch((error) => [null, error])
    : [null, new Error(`Undefined promiseIns : ${promiseIns}`)]);

const handleResponse = (...args) => {
    const [_actionFn, req, res] = args;
    const errors = validationResult(req);
    /**
     * Finds the validation errors in this request and wraps them in an object withhandy functions
    */
    if (!errors.isEmpty()) {
        return res.status(HTTP_UNPROCESSABLE_ENTITY).send({
            code: "ERR_SYSTEM",
            return_code: 1025,
            errors: errors.array({ onlyFirstError: true })
        });
    }
    return _actionFn(req).then(res.success).catch((error) => {
        error.statusCode = error.statusCode || 500;
        // Log only if error is not intentionally thrown
        if (!(error instanceof BaseError)) {
            if (error.statusCode >= 500) {
                logger.error(error);
            } else {
                logger.warn(error.message);
            }
        }
        return res.error(error);
    });
};

module.exports = {
    generateRandomString,
    getIpAddress,
    textToBase64,
    base64ToText,
    handlePromise,
    getUniqueArray,
    omitKeyFromObject,
    extend,
    arrayDifference,
    isEqualArray,
    getOldDate,
    makePasswordSalt,
    filterByTime,
    handleResponse
};
