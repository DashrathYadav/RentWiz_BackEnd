"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Addresses",
      {
        addressId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        street: {
          type: Sequelize.STRING,
        },
        landMark: {
          type: Sequelize.STRING,
        },
        area: {
          type: Sequelize.STRING,
        },
        cityId: {
          type: Sequelize.INTEGER,
          required: true,
        },
        pincode: {
          type: Sequelize.INTEGER,
          required: true,
        },
        stateId: {
          type: Sequelize.INTEGER,
          required: true,
        },
        countryId: {
          type: Sequelize.INTEGER,
          required: true,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
