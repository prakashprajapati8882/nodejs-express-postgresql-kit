const statusCodes = require("../config/status-codes");
const statusMessage = require("../config/status-message");
const { dbConnection } = require("../database/database-connection.service");
const { TokenService } = require("../services/token.service");

module.exports = async (_req, _res, _next) => {
    if (!(_req.headers && _req.headers.authorization)) {
        return _res.status(statusCodes.FORBIDDEN).send({ message: statusMessage.NO_AUTHORIZATION_HEADER });
    }

    const { users } = dbConnection.default;

    // Read Token from Request header and check for Bearer token 
    const tokenInfo = _req?.headers?.authorization?.split(" ");
    const token = (tokenInfo?.length && (/^Bearer$/i.test(tokenInfo[0]))) ? tokenInfo[1] : "";
    if (!token) return _res.status(statusCodes.FORBIDDEN).send({ message: statusMessage.SESSION_EXPIRED });

    // Decode the token and check for valid data
    const tokeData = TokenService.decodeToken(token);
    if (!tokeData?.id) return _res.status(statusCodes.UNAUTHORIZED).send({ message: statusMessage.SESSION_EXPIRED });

    // Get User information from the 
    const userData = await users.findOne({ where: { id: tokeData.id }, attibutes: ["firstName", "lastName", "status", "password"] });
    if (!userData?.status) {
        return _res.status(statusCodes.UNAUTHORIZED).send({ message: statusMessage.SESSION_EXPIRED });
    }

    const tokenObj = await TokenService.verifyToken(token, userData.password);
    if (!tokenObj) return _res.status(statusCodes.UNAUTHORIZED).send({ message: statusMessage.SESSION_EXPIRED });

    const totalSessionActiveTime = new Date().getTime() - new Date(tokeData?.time).getTime();
    const defaultSessionTimeout = 2 * 60 * 60 * 1000;
    if (totalSessionActiveTime > defaultSessionTimeout) {
        return _res.status(statusCodes.UNAUTHORIZED).send({ message: statusMessage.SESSION_EXPIRED });
    }
    _req.appUrl = `${_req.protoal}${_req.get("host")}`;

    _req.user = {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        status: userData.status,
        email: userData.email
    };
    return _next();
};
