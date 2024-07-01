"use strict";
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const { database } = config;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        const schemaName = database; // Replace with your schema name
        const procedureName = 'usp_Registration'; // Replace with your procedure name
        const [results] = await queryInterface.sequelize.query(
            `SELECT routine_name FROM information_schema.routines WHERE routine_schema = '${schemaName}' AND routine_name = '${procedureName}' AND routine_type = 'PROCEDURE'`,
            { type: queryInterface.sequelize.QueryTypes.SELECT }
        );
        if (results == undefined || results.length === 0) {
            // Procedure doesn't exist in the specified schema, you can create it here
            const createProcedureSQL = `
            CREATE PROCEDURE usp_Registration(
                IN firstName nvarchar(250),
                IN lastName nvarchar(250),
                IN email nvarchar(250),
                IN password nvarchar(250),
                IN mobileNumber nvarchar(15),
                IN confirmOTP int
            )
            BEGIN
                Declare userID Int; 
                Insert Into users(firstName, lastName, email, password, mobileNumber, isActive, isConfirm, confirmOtp, otpGenerateAt, createdAt)
                    Values(firstName, lastName, email, password, mobileNumber, 0, 0, confirmOtp, current_date(), current_date()); 
                    Set userID = (select LAST_INSERT_ID());
                
                If(userID > 0) THEN
                    Select firstName, lastName, email, mobileNumber From users
                    Where userID = userID;
                end if;
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
			DROP PROCEDURE IF EXISTS usp_Registration;
		`);
    },
};
