const { dbConnection } = require("../../database/database-connection.service");

const getUserByCondition = async (where) => {
    const { users } = dbConnection.default;
    return users.findOne({ where });
};

const createUser = async (userDetails) => {
    const { users } = dbConnection.default;
    return users.create(userDetails);
};

module.exports = {
    createUser,
    getUserByCondition
};
