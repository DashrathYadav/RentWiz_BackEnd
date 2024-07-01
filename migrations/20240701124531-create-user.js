"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            userID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                type: Sequelize.STRING,
                required: true,
            },
            lastName: {
                type: Sequelize.STRING,
                required: true,
            },
            email: {
                type: Sequelize.STRING,
                required: true,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                required: true,
            },
            mobileNumber: {
                type: Sequelize.STRING,
                maxlength: 10,
                required: true,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                default: 0,
            },
            isConfirm: {
                type: Sequelize.BOOLEAN,
                default: 0,
            },
            confirmOTP: {
                type: Sequelize.INTEGER,
                maxlength: 4,
            },
            otpGenerateAt: {
                type: Sequelize.DATE,
            },
            resetPasswordToken: {
                type: Sequelize.STRING,
            },
            accountConfirmDate: {
                type: Sequelize.DATE,
            },
            accountInActiveDate: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue:null
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
