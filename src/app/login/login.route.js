const { validateLogin } = require("./login.request");
const loginCtrl = require("./login.controller");
const { handleResponse } = require("../../utilities/common-utils");

module.exports = async (router) => {
    router.post("/api/v1/login", validateLogin(), handleResponse.bind(this, loginCtrl.login));
    router.post("/api/v1/register", handleResponse.bind(this, loginCtrl.registerUser));
};
