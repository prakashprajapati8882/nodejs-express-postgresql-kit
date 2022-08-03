const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const { loadRoutesAndMiddleware } = require("./utilities/server-utill");

const app = express();

// Load API Logger Middleware
app.use(require("./middlewares/api-logger.middleware"));
app.use(require("./middlewares/response-handler.middleware"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(require("./middlewares/cors"));
app.use(require("./middlewares/helmet"));

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ["Content-Disposition", "FileLength"]
}));

loadRoutesAndMiddleware(app);

app.use("/api/v1", require("./middlewares/error-response-handler.middleware"));
app.use("/api/v1", require("./middlewares/error-handler.middleware"));

app.get("/", (req, res) => {
    res.status(200).send("<h1>NodeJs PostgreSQL Boilerplate</h1>");
});

module.exports = app;