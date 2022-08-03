require("dotenv").config();

const app = require("./src/app");
const { startServer } = require("./src/server");

// Set Current Working Direcory 
if (!process.env.CURRENT_WORKING_DIRECTORY) {
    process.env.CURRENT_WORKING_DIRECTORY = process.cwd();
}

// Start the Server
startServer(app);