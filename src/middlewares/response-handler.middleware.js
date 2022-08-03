// const Sequelize = require("sequelize");
const { BaseError } = require("../services/error-class");
const logger = require("../logger/logger");

const baseError = new BaseError();

module.exports = (_req, _res, _next) => {
    logger.info(`Incoming request on URL :  ${_req.url}`);

    // this can be used for return success response 
    _res.success = async (data) => _res.status(200).send({ status: "SUCCESS", code: 1000, ...data });

    // this can we used for send error or bad request
    _res.error = async (_error) => {
        const errors = (_error.errors || []).map((error) => ({
            message: error.message,
            type: error.type,
            path: error.path,
            value: error.value
        }));
        const message = _error.message || baseError.message;
        const error = {
            errors,
            message,
            code: _error.code || baseError.code,
            return_code: _error.returnCode || baseError.returnCode
        };
        logger.error(error);
        return _res.status(_error.statusCode || 400).json(error).end();
    };

    // this can we used for send the cusstom response 
    _res.customResponse = async (data) => {
        const { response, statusCode } = data;
        const result = {
            ...response,
            code: statusCode == 200 ? "SUCCESS" : baseError.code,
            return_code: statusCode == 200 ? 1000 : 1025
        };
        return _res.status(statusCode).send(result);
    };

    _next();
};