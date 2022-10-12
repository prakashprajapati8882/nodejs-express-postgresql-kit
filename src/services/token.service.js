const jwt = require("jsonwebtoken");

const salt = "YtRGWrInLQenFfexhPapd3IoS5JNjpzs&EIO";

class TokenService {
    /**
     * 
     * @param {Object} payload 
     * @param {String} pwdHash 
     * @param {Object} additionDetails
     * @return String
     */
    static issueToken(payload, pwdHash, additionDetails = {}) {
        return jwt.sign(payload, salt + pwdHash, additionDetails);
    }

    /**
     * 
     * @param {String} token 
     * @param {String} pwdhash 
     * @returns 
     */
    static verifyToken(token, pwdhash) {
        return jwt.verify(token, salt + pwdhash, {});
    }

    /**
     * 
     * @param {Strubg} token 
     * @returns 
     */
    static decodeToken(token) {
        return jwt.decode(token);
    }
}

module.exports = {
    TokenService
};