const { dbConnection } = require("../../database/database-connection.service");

const createBasicLoanInfo = async (req) => {
    const { body } = req;
    console.log(">nodejs-boilerplate | [basic-loan-info.controller.js] > #5 | body : ", body);
    const { basic_loan_info: basicLoanInfo } = dbConnection.default;
    await basicLoanInfo.create(body);
    return { message: "basic loan info created." };
};

module.exports = {
    createBasicLoanInfo
};
