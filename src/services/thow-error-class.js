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
    throwError(_error = BaseError, reject) {
        if (typeof _error === "function") {
            if (reject) {
                reject(new _error());
            } else {
                throw new _error();
            }
        } else if (reject) {
            reject(_error);
        } else {
            throw _error;
        }
    },

    throwIf(_cond, _error = BaseError, reject = null) {
        return Assert.isTruthy(_cond) && Assert.throwError(_error, reject);
    },

    throwIfNot(_cond, _error = BaseError, reject = null) {
        return !Assert.isTruthy(_cond) && Assert.throwError(_error, reject);
    }
};

module.exports = Assert;
