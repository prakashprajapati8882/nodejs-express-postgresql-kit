const { BaseError } = require("./error-class");

const Assert = {
    isTruthy(_cond) {
        // Casting boolean and integer strings
        let cond = +_cond;

        if (Number.isNaN(Number(cond))) {
            if (typeof _cond === "undefined") {
                cond = _cond;
            } else if (typeof _cond === "function") {
                cond = _cond();
            } else if (typeof _cond === "string") {
                cond = _cond.trim();
            } else if (Array.isArray(_cond)) {
                cond = _cond.length;
            } else {
                cond = Object.keys(_cond).length;
            }
        }
        return !!cond;
    },

    // eslint-disable-next-line default-param-last
    throwError(statusCode, message, reject) {
        if (reject) {
            return reject(message);
        } else {
            throw new BaseError(statusCode, message);
        }
    },

    throwIf(_cond, statusCode, message, reject = null) {
        return Assert.isTruthy(_cond) && Assert.throwError(statusCode, message, reject);
    },

    throwIfNot(_cond, statusCode, message, reject = null) {
        return !Assert.isTruthy(_cond) && Assert.throwError(statusCode, message, reject);
    }
};

module.exports = Assert;
