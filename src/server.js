const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { generateSelfSignedSSL, getSSLConfig } = require("./ssl/ssl.service");
const { createDatabaseConnection } = require("./database/database-connection.service");
const { runMigrationsAndSeeders } = require("./database/services/run-migration-seeders");
const { loadRoutesAndMiddleware } = require("./utilities/server-utill");

const { HTTPS_PORT, HTTP_PORT } = process.env;

const startServer = async (app) => {
    // Execute migrations and seeders for database
    await runMigrationsAndSeeders();
    
    // Create PostgreSQL database connection
    await createDatabaseConnection();

    // load routes and controllers files
    await loadRoutesAndMiddleware(app);

    if (!fs.existsSync(path.join(__dirname, "ssl/keys/localhost.key"))) {
        await generateSelfSignedSSL();
    }
    const sslConfig = getSSLConfig();
    const secureServer = createHttpsServer(app, sslConfig);
    secureServer.listen(HTTPS_PORT, function () {
        console.log(`Server is listening on port ${HTTPS_PORT}`);
    });

    // Redirect from http port 80 to https
    createHttpServer();
};

const createHttpServer = () => http.createServer(function (req, res) {
    const redirectURL = `https://${req.headers.host}${req.url}`.replace(HTTP_PORT, HTTPS_PORT);
    res.writeHead(301, { Location: redirectURL });
    res.end();
}).listen(HTTP_PORT);

const createHttpsServer = (_app, sslConfig) => {
    const options = {
        key: fs.readFileSync(path.join(sslConfig.keyPath)),
        cert: fs.readFileSync(path.join(sslConfig.certPath))
    };
    return https.createServer(options, _app);
};

module.exports = {
    startServer
};
