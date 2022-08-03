"use strict";

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            "users",
            {
                id: {
                    type: Sequelize.UUID,
                    field: "id",
                    primaryKey: true,
                    unique: true,
                    defaultValue: Sequelize.UUIDV4
                },
                firstName: {
                    type: Sequelize.STRING,
                    field: "first_name"
                },
                lastName: {
                    type: Sequelize.STRING,
                    field: "last_name"
                },
                email: {
                    type: Sequelize.STRING
                },
                cellPhone: {
                    type: Sequelize.STRING,
                    field: "cell_phone"
                },
                password: {
                    type: Sequelize.STRING
                },
                profilePic: {
                    type: Sequelize.STRING,
                    field: "profile_pic"
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
        return queryInterface.dropTable("users");
    }
};