"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
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
      password: {
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
      addressId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Address", // Name of the target model
          key: "addressId", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        name: "fk_user_address_id",
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "User_Role", // Name of the target model
          key: "userRoleID", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        name: "fk_user_role_id",
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
        required: true,
      },
      lastModifiedBy: {
        type: Sequelize.BIGINT,
        required: true,
      },
      creationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      lastModificationdDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
