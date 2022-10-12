const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const swaggerAPIDoc = require("./swagger");

const app = express();

// Load API Logger Middleware
app.use(require("./middlewares/api-logger.middleware"));
app.use(require("./middlewares/response-handler.middleware"));

app.use(fileUpload());
app.use(cookieParser());
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

// Loadding Swagger API Doc
swaggerAPIDoc(app);

app.use("/", express.static(path.join(__dirname, "../client")));
app.use("/", express.static(path.join(process.cwd(), "client")));

app.get(["index.html", "/*"], (req, res) => {
    const indexFilePath = process.env.INDEX_FILE_PATH || path.join(__dirname, "../client/build/index.html");
    res.sendFile(indexFilePath);
});

module.exports = app;