const ctrl = require("./basic-loan-info.controller");

module.exports = (router) => {
    router.post("/api/v1/create-loan-basic-info", (_req, _res, _next) => ctrl.createBasicLoanInfo(_req).then(_res.success).catch(_next));
};
