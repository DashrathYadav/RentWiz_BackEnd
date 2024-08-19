
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Availability_Status_LK", [
        /*  {1: Available, 2: Booked, 3: Rented, 4: Not Available} */
            {
                statusId: 1,
                statusName: "Available",
            },
            {
                statusId: 2,
                statusName: "Booked",
            },
            {
                statusId: 3,
                statusName: "Rented",
            },
            {
                statusId: 4,
                statusName: "Not Available",
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Availability_Status_LK", null, {});
    },
};