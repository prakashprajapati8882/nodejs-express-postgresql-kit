const { TokenService } = require("../../services/token.service");

/**
 * 
 * @param {*} userData 
 * @returns Object
 */
const issueJwt = function (userData = {}) {
    const tokenizeObj = {
        id: userData.id,
        email: userData.email,
        time: (new Date()).getTime(),
        status: userData.status
    };
    return TokenService.issueToken(tokenizeObj, userData.password);
};

module.exports = {
    issueJwt
};
