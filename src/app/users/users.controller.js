const { Op } = require("sequelize");
const { dbConnection } = require("../../database/database-connection.service");
const { throwIf } = require("../../services/thow-error-class");
const { Encryption } = require("../../services/encryption.service");
const statusCodes = require("../../config/status-codes");
const userService = require("./users.service");
const statusMessages = require("../../config/status-message");

/**
 * @swagger
 * '/api/v1/applicant-assets':
 *  post:
 *     tags:
 *     - Assets
 *     summary: Add assets
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              isPropertyIdentified:
 *                type: boolean
 *                default: true
 *              typeOfProperty:
 *                type: string
 *                default: OFFICE
 *              isCurrentAddSameAsCollateralProperty:
 *                type: boolean
 *                default: true
 *              propertyOwnership:
 *                type: string
 *                default: JOINT
 *              proposedAreaOfConstruction:
 *                type: string
 *                default: jaipur
 *     responses:
 *      200:
 *        description: Created
 *      400:
 *        description: duplicate
 */

const createUser = async (req) => {
    const { email, password } = req.body;

    const userInfo = await userService.getUserByCondition({ email });
    throwIf(userInfo, statusCodes.DUPLICATE, statusMessages.USER_EXIST);

    req.body.status = true;
    if (password) {
        req.body.salt = Encryption.makeUserSalt(16);
        req.body.password = Encryption.encryptPassword(password, req.body.salt);
    }
    await userService.createUser(req.body);
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
        where: { id: { [Op.ne]: req.user.id } },
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
    const { emailId } = req.query;
    const userInfo = await userService.getUserByCondition({ email: emailId });
    return { data: userInfo };
};

module.exports = {
    createUser,
    getAllUsers,
    getUserInfoByEmail
};
