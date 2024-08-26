"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Currency_LKs", [
            {
                currencyId: 1,
                currencyCode: "INR",
                currencyName: "Indian Rupee",
            },
            {
                currencyId: 2,
                currencyCode: "USD",
                currencyName: "US Dollar",
            },
            {
                currencyId: 3,
                currencyCode: "GBP",
                currencyName: "British Pound",
            },
            {
                currencyId: 4,
                currencyCode: "EUR",
                currencyName: "Euro",
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Availability_Status_LK", null, {});
    },
};
