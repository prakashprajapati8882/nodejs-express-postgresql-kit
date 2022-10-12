const statusMessage = require("../../config/status-message");
const requestValidation = require("../../utilities/request-validation");

const validateLogin = () => [
    requestValidation.validateIfEmailId("email"),
    requestValidation.validateIfExist("password", statusMessage.PASSWORD_NOT_FOUND)
];

module.exports = { validateLogin };
