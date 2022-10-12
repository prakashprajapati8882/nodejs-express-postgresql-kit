"use strict";

const path = require("path");
const { seedFromCsv } = require("../services/run-seeder");

module.exports = {
    up: function (queryInterface, Sequelize) {
        const file = path.join(__dirname, "csv", path.basename(__filename).replace(".js", ".csv"));
        const map = function (_data) {
            return {
                id: _data[0],
                first_name: _data[1],
                last_name: _data[2],
                email: _data[3],
                cell_phone: _data[4],
                password: _data[5],
                profile_pic: _data[6],
                status: true,
                salt: _data[8]
            };
        };
        return seedFromCsv(queryInterface, "users", file, map);
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete("users", null, {});
    }
};
