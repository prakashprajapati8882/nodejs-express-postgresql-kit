'use strict';

const path = require('path');
const { seedFromCsv } = require("../services/run-seeder")

module.exports = {
	up: function (queryInterface, Sequelize) {
		var file = path.join(__dirname, 'csv', path.basename(__filename).replace('.js', '.csv'));
		var map = function (_data) {
			return {
				first_name: _data[0],
				last_name: _data[1],
				email: _data[2],
				cell_phone: _data[3],
				password: _data[4],
				profilePic: _data[5],
			}
		};
		return seedFromCsv(queryInterface, 'users', file, map);
	},
	down: function (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('users', null, {});
	}
};
