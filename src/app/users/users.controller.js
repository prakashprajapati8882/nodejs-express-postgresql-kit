const { dbConnection } = require("../../database/database-connection.service");

/**
 * 
 * @param {*} req 
 * @payload  {
 *        "firstname": "SuperAdmin",
 *        "lastname": "User",
 *        "email": "admin@admin.com",,
 *        "cellPhone": "+919876543210",
 *        "password": "password",
 *        "profilePic": null
 *      }
 * @returns { message } object
 */
const createUser = async (req) => {
    const { users } = dbConnection.default;
    await users.create(req.body);
    return { message: "User is created successfully!" };
};

/**
 * 
 * @param {*} req 
 * @query { itemPerPage: 10, selectedItems: 1 }
 * @returns { data } object
 */
const getAllUsers = async (req) => {
    const { users } = dbConnection.default;
    const { itemPerPage, selectedItems } = req.query;
    const data = await users.findAndCountAll({
        limit: itemPerPage,
        offset: (itemPerPage * (selectedItems - 1))
    });
    return { data };
};

/**
 * 
 * @param {*} req 
 * @returns { data } object
 */
const getUserInfoByEmail = async (req) => {
    const { users } = dbConnection.default;
    const { emailId } = req.query;
    const userInfo = await users.findOne({ where: { email: emailId } });
    return { data: userInfo };
};

module.exports = {
    createUser,
    getAllUsers,
    getUserInfoByEmail
};
