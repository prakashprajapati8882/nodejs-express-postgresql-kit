const fs = require("fs");
const path = require("path");
const router = require("express").Router();

const loadRoutesAndMiddleware = async function (app) {
    try {
        const modulesPath = path.join(__dirname, "../app");
        const modules = fs.readdirSync(path.join(__dirname, "../app"));
        for (let i = 0, { length } = modules; i < length; i++) {

            const moduleFiles = modules[i];
            const routePath = path.join(modulesPath, moduleFiles);
            const routes = fs.readdirSync(routePath);
            routes.forEach(function (file) {
                const fileName = file.split(".");
                const modelData = fileName[1];
                if (modelData && modelData.toLowerCase() === "route") {
                    // eslint-disable-next-line import/no-dynamic-require, global-require
                    return require(path.join(routePath, file))(router);
                }
            });
        }
        app.use("/", router);
    } catch (error) {
        throw new Error("Error while loading all routes and utils file.");
    }
};

module.exports = {
    loadRoutesAndMiddleware
};