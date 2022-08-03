module.exports = (_req, _res, _next) => {
    _res.setHeader("Access-Control-Allow-Origin", "*");
    _res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE", "OPTIONS");
    _res.set("Access-Control-Allow-Credentials", "true");
    _res.setHeader("Access-Control-Allow-Headers", ",X-XSRF-TOKEN,Content-Type,Authorization,JwtAuth,noMessage,noNavigate");
    _next();
};
