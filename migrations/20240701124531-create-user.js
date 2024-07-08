"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      loginId: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
      },
      passWord: {
        type: Sequelize.STRING,
        required: true,
      },
      newPassword: {
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
        required: true,
      },
      mobileNumber: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
      },
      aadharNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      document: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.INTEGER,
        required: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        required: true,
      },
      note: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        default: 0,
      },
      createdBy: {
        type: Sequelize.BIGINT,
      },
      lastModifiedBy: {
        type: Sequelize.BIGINT,
      },
      creationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      lastModificationdDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
