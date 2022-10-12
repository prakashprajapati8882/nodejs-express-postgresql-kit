const users = require("./users.controller");
const isAuthenticated = require("../../middlewares/verify-user-token.middleware");
const { validateUserSaveOrUpdate } = require("./users.request");
const { handleResponse } = require("../../utilities/common-utils");

module.exports = (router) => {
    router.post("/api/v1/user/create", isAuthenticated, validateUserSaveOrUpdate, handleResponse.bind(this, users.createUser));
    router.get("/api/v1/user/list", isAuthenticated, handleResponse.bind(this, users.getUserInfoByEmail));
    router.get("/api/v1/users/list", isAuthenticated, handleResponse.bind(this, users.getAllUsers));
};