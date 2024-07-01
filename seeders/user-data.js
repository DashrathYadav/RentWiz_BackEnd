'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
    return queryInterface.bulkInsert('users', [
        {
            userID: 1,
            firstName: "Anurag",
            lastName: "Dubey",
            email: "anurag@gmail.com",
            password: "$2a$10$szTmoY7gN1J2ZmkOO7AVweUc.RCeoviFBvLEYGoLq61E7UqB/atka",
            mobileNumber: "9762229312",
            isActive: 1,
            isConfirm: 1,
            confirmOTP: 8853,
            otpGenerateAt: new Date(),
            resetPasswordToken: null,
            accountConfirmDate: null,
            accountInActiveDate: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            userID: 2,
            firstName: "sachin",
            lastName: "singh",
            email: "sachin@gmail.com",
            password: "$2a$10$e7etQn..baNyq.viImvXKeJISVfRzULpatDidC5J4YDK1jqjK3ZO2",
            mobileNumber: "9096418659",
            isActive: 1,
            isConfirm: 1,
            confirmOTP: 5140,
            otpGenerateAt: new Date(),
            resetPasswordToken: null,
            accountConfirmDate: null,
            accountInActiveDate: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
