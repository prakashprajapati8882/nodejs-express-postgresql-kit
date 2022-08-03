/* eslint-disable max-classes-per-file */
/* eslint-disable default-param-last */
/* eslint-disable no-nested-ternary */
const BaseError = class extends Error {
    constructor(statusCode = 500, _message, code = "ERR_SYSTEM") {
        super(_message);
        this.statusCode = statusCode;
        this.returnCode = 1025;
        this.code = code;
        this.message = (
            _message && (_message.message
                ? _message.message : _message.msg
                    ? _message.msg : _message)
        )
         || "Something went wrong, Please try again later";
    }
};
  
module.exports.BaseError = BaseError;
  
// ============== Default status code errors ============== //
module.exports.BadRequestError = class extends BaseError {
    constructor(_message) {
        super(_message);
        this.statusCode = 400;
    }
};
  
module.exports.NotAuthenticatedError = class extends BaseError {
    constructor(_message) {
        super(_message);
        this.statusCode = 401;
        this.message = _message || "You are not authenticated";
    }
};
  
module.exports.NotAuthorizedError = class extends BaseError {
    constructor(_message) {
        super(_message);
        this.statusCode = 403;
        this.message = _message || "You are not authoirzed";
    }
};
  
module.exports.RecordDoesNotExistsError = class extends BaseError {
    constructor(_message) {
        super(_message);
        this.statusCode = 404;
        this.code = "ERR_RECORD_DOESNOT_EXISTS";
        this.message = _message || "Record does not exist with our system";
    }
};
  
module.exports.RecordAlreadyExistsError = class extends BaseError {
    constructor(_message) {
        super(_message);
        this.statusCode = 409;
        this.code = "ERR_RECORD_ALREADY_EXISTS";
        this.message = _message || "Record already exists with same attributes";
    }
};

module.exports.RequestParamsInvalidError = class extends BaseError {
    constructor(_message) {
        super(_message);
        this.statusCode = 422;
        this.code = "ERR_REQUEST_PARAMS_INVALID";
        this.message = _message || "Some request params are invalid";
    }
};

module.exports.PathNotFoundError = class extends BaseError {
    constructor(_message) {
        super(_message);
        this.statusCode = 404;
        this.code = "ERR_PATH_NOT_FOUND";
        this.message = _message || "Path not found";
    }
};
