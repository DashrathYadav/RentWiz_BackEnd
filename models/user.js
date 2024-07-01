/**
 * Users model which containts the table attributes.
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    users.init(
        {
            userID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            firstName: {
                type: DataTypes.STRING,
                required: true,
            },
            lastName: {
                type: DataTypes.STRING,
                required: true,
            },
            email: {
                type: DataTypes.STRING,
                required: true,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                required: true,
            },
            mobileNumber: {
                type: DataTypes.STRING,
                maxlength: 10,
                required: true,
                unique: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                default: 0,
            },
            isConfirm: {
                type: DataTypes.BOOLEAN,
                default: 0,
            },
            confirmOTP: {
                type: DataTypes.INTEGER,
                maxlength: 4,
            },
            otpGenerateAt: {
                type: DataTypes.DATE,
            },
            resetPasswordToken: {
                type: DataTypes.STRING,
            },
            accountConfirmDate: {
                type: DataTypes.DATE,
            },
            accountInActiveDate: {
                type: DataTypes.DATE,
            },
            createdAt: {
                allowNull: true,
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
            updatedAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "users",
        }
    );
    return users;
};
