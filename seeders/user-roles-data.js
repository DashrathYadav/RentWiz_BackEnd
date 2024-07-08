"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("userRoles", [
      {
        userRoleID: 1,
        userRole: "Admin",
        userRoleDesc: "Administrator role with full access",
      },
      {
        userRoleID: 2,
        userRole: "Owner",
        userRoleDesc: "Manager role with limited access",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("userRoles", null, {});
  },
};
