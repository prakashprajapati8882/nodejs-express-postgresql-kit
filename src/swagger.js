const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { APP_NAME } = process.env;

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: `${APP_NAME} API doc`,
            description: `${APP_NAME} API doc`,
            version: "1.0.0"
        },
        securityDefinitions: {
            JWT: {
                description: "Bearer Token",
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }
        }
    },
    // looks for configuration in specified directories
    apis: ["./src/**/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
    // Swagger Page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Documentation in JSON format
    app.get("/docs.json", (res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;