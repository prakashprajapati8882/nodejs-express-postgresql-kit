"use strict";

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            "basic_loan_info",
            {
                id: {
                    type: Sequelize.UUID,
                    field: "id",
                    primaryKey: true,
                    unique: true,
                    defaultValue: Sequelize.UUIDV4
                },
                requiredLoanAmount: {
                    type: Sequelize.INTEGER,
                    field: "required_loan_amount"
                },
                loanTenureInMonths: {
                    type: Sequelize.INTEGER,
                    field: "loan_tenure_in_months"
                },
                email: {
                    type: Sequelize.STRING,
                    field: "email"
                },
                landlineNumber: {
                    type: Sequelize.STRING,
                    field: "landline_number"
                },
                haveExistingLoanWithAavas: {
                    type: Sequelize.STRING,
                    field: "have_existing_loan_with_aavas"
                },
                loanType: {
                    type: Sequelize.STRING,
                    field: "loan_type"
                },
                gender: {
                    type: Sequelize.STRING,
                    field: "gender"
                },
                phoneNumber: {
                    type: Sequelize.STRING,
                    field: "phone_number"
                },
                nameeOfFirstReference: {
                    type: Sequelize.STRING,
                    field: "name_of_first_ref"
                },
                phoneNumberOfFirstReference: {
                    type: Sequelize.STRING,
                    field: "phone_no_of_first_ref"
                },
                addressOfFirstReference: {
                    type: Sequelize.STRING,
                    field: "address_of_first_ref"
                },
                nameeOfSecondReference: {
                    type: Sequelize.STRING,
                    field: "name_of_second_ref"
                },
                phoneNumberOfSecondReference: {
                    type: Sequelize.STRING,
                    field: "phone_no_of_second_ref"
                },
                addressOfSecondReference: {
                    type: Sequelize.STRING,
                    field: "address_of_second_ref"
                },
                userId: {
                    type: Sequelize.UUID,
                    field: "user_id",
                    references: {
                        model: "users",
                        key: "id"
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    allowNull: false
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
                }
            }
        );
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("basic_loan_info");
    }
};