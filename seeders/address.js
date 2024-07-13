"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("address", [
      {
        addressId: 1,
        street: "123 Main St",
        landMark: "Near Central Park",
        area: "Downtown",
        cityId: 1,
        pincode: 10001,
        stateId: 1,
        countryId: 1,
      },
      {
        addressId: 2,
        street: "456 Elm St",
        landMark: "Opposite to Mall",
        area: "Suburbs",
        cityId: 2,
        pincode: 20002,
        stateId: 2,
        countryId: 1,
      },
      {
        addressId: 3,
        street: "789 Oak St",
        landMark: "Next to Hospital",
        area: "Uptown",
        cityId: 3,
        pincode: 30003,
        stateId: 3,
        countryId: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("address", null, {});
  },
};
