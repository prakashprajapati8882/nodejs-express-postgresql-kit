const statusMessage = require("../../config/status-message");
const requestValidation = require("../../utilities/request-validation");

const validateUserSaveOrUpdate = () => [
    requestValidation.validateIfEmpty(
        "firstName",
        statusMessage.FIRST_NAME_NOT_FOUND,
        statusMessage.PLEASE_CHECK_FIRST_NAME_LENGTH
    ),
    requestValidation.validateIfEmpty(
        "lastName",
        statusMessage.LAST_NAME_NOT_FOUND,
        statusMessage.PLEASE_CHECK_LAST_NAME_LENGTH
    ),
    requestValidation.validateIfEmailId("email")
];

module.exports = {
    validateUserSaveOrUpdate
};
