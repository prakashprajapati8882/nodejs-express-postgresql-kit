const createDbConnection = require("./services/sequlize");

const dbConnection = {};

const createDatabaseConnection = async () => {
    if (!Object.keys(dbConnection).length) {
        dbConnection.default = await createDbConnection();
        console.log("*** PostgresSQL connection successfully created ***");
    }
};

module.exports = {
    createDatabaseConnection,
    dbConnection
};
