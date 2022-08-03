module.exports = function (sequelize, DataTypes) {
    const basicLoanInformation = sequelize.define(
        "basic_loan_info",
        {
            id: {
                type: DataTypes.UUID,
                field: "id",
                primaryKey: true,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            requiredLoanAmount: {
                type: DataTypes.INTEGER,
                field: "required_loan_amount"
            },
            loanTenureInMonths: {
                type: DataTypes.INTEGER,
                field: "loan_tenure_in_months"
            },
            email: {
                type: DataTypes.STRING,
                field: "email"
            },
            landlineNumber: {
                type: DataTypes.STRING,
                field: "landline_number"
            },
            haveExistingLoanWithAavas: {
                type: DataTypes.STRING,
                field: "have_existing_loan_with_aavas"
            },
            loanType: {
                type: DataTypes.STRING,
                field: "loan_type"
            },
            gender: {
                type: DataTypes.STRING,
                field: "gender"
            },
            phoneNumber: {
                type: DataTypes.STRING,
                field: "phone_number"
            },
            nameeOfFirstReference: {
                type: DataTypes.STRING,
                field: "name_of_first_ref"
            },
            phoneNumberOfFirstReference: {
                type: DataTypes.STRING,
                field: "phone_no_of_first_ref"
            },
            addressOfFirstReference: {
                type: DataTypes.STRING,
                field: "address_of_first_ref"
            },
            nameeOfSecondReference: {
                type: DataTypes.STRING,
                field: "name_of_second_ref"
            },
            phoneNumberOfSecondReference: {
                type: DataTypes.STRING,
                field: "phone_no_of_second_ref"
            },
            addressOfSecondReference: {
                type: DataTypes.STRING,
                field: "address_of_second_ref"
            },
            userId: {
                type: DataTypes.UUID,
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
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
            }
        },
        {
            freezeTableName: true,
            associate: (models) => {
                basicLoanInformation.belongsTo(models.users, { foreignKey: "userId" });
            }
        }
    );

    basicLoanInformation.addHook("afterCreate", async function (loandata, options) {
        console.log(">nodejs-boilerplate | [users.model.js] > #38 | options : ", options);
        console.log(">nodejs-boilerplate | [users.model.js] > #39 | loandata : ", loandata);
    });

    basicLoanInformation.addHook("afterUpdate", async function (loandata, options) {
        console.log(">nodejs-boilerplate | [users.model.js] > #43 | options : ", options);
        console.log(">nodejs-boilerplate | [users.model.js] > #44 | loandata : ", loandata);
    });

    basicLoanInformation.addHook("afterDestroy", async function (loandata, options) {
        console.log(">nodejs-boilerplate | [users.model.js] > #48 | loandata : ", loandata);
        console.log(">nodejs-boilerplate | [users.model.js] > #49 | options : ", options);
    });

    return basicLoanInformation;
};