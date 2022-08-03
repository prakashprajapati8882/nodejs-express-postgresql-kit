const serverLogging = require("./server-logging.controller");

module.exports = (router) => {
    router.post("/api/v1/create-server-logs", (_req, _res, _next) => serverLogging.createServerLogs(_req).then(_res.success).catch(_next));
};