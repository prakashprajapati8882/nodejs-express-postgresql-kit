const logger = require("../logger/logger");

module.exports = (_req, _res, _next) => {
    _res.on("finish", () => {
        logger.info(`Method: ${_req.method} URL: ${_req.url} IP: ${_req.socket.remoteAddress} Status: ${_res.statusCode}`);
    });
    _next();
};