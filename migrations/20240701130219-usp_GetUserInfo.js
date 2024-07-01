'use strict';
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const { database } = config;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const schemaName = database; // Replace with your schema name
		const procedureName = 'usp_GetUserInfo'; // Replace with your procedure name
		const [results] = await queryInterface.sequelize.query(
			`SELECT routine_name FROM information_schema.routines WHERE routine_schema = '${schemaName}' AND routine_name = '${procedureName}' AND routine_type = 'PROCEDURE'`,
			{ type: queryInterface.sequelize.QueryTypes.SELECT }
		);
		if (results == undefined || results.length === 0) {
			// Procedure doesn't exist in the specified schema, you can create it here
			const createProcedureSQL = `
			CREATE PROCEDURE usp_GetUserInfo(
				IN id int
			)
			BEGIN
				Select userID, firstName, lastName, email, mobileNumber
				From users
				Where userID = id;
				
			END
		`;
			return await queryInterface.sequelize.query(createProcedureSQL);
		} else {
			// Procedure already exists in the specified schema, handle it as needed
			console.log("exist")
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		return queryInterface.sequelize.query(`
			DROP PROCEDURE IF EXISTS usp_GetUserInfo;
		`);
	}
};
