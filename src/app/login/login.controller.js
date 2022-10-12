const { Encryption } = require("../../services/encryption.service");
const { throwIfNot, throwIf } = require("../../services/thow-error-class");
const statusCodes = require("../../config/status-codes");
const statusMessages = require("../../config/status-message");
const { issueJwt } = require("./login.service");
const userService = require("../users/users.service");

const login = async function (req) {
    const { email, password } = req.body;

    // check validate email and password exist in body
    throwIfNot((email || password), statusCodes.BAD_REQUEST, statusMessages.EMAIL_PASSWORD_NOT_FOUND);

    // Check If user email exist or not
    const [userInfo, error] = await handlePromise(userService.getUserByCondition({ email }));
    throwIf(error, statusCodes.BAD_REQUEST, statusMessages.USER_NOT_FOUND);

    throwIfNot(userInfo, statusCodes.NOT_FOUND, statusMessages.USER_NOT_FOUND);

    // Check for Password Match
    const passwordHash = Encryption.encryptPassword(password, userInfo.salt);
    throwIfNot((passwordHash === userInfo.password), statusCodes.BAD_REQUEST, statusMessages.INVALID_EMAIL_OR_PASSWORD);

    throwIfNot(userInfo.status, statusCodes.NOT_FOUND, statusMessages.USER_NOT_ACTIVE);

    const token = issueJwt(userInfo);
    return { token };
};

const registerUser = async (req) => {
    const { email, password } = req.body;

    const userInfo = await userService.getUserByCondition({ email });
    throwIf(userInfo, statusCodes.DUPLICATE, statusMessages.USER_EXIST);

    req.body.status = false;
    req.body.salt = Encryption.makeUserSalt(16);
    req.body.password = Encryption.encryptPassword(password, req.body.salt);

    await userService.createUser(req.body);
    return { message: statusMessages.USER_REGISTERED };
};

module.exports = {
    login,
    registerUser
};
