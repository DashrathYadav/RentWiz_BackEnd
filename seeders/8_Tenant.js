"use strict";

const securePassword = require("../src/helpers/securePassword");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tenants", [
            {
              "tenantId": 1,
              "tenantName": "Ramesh Kumar",
              "tenantMobile": "9876543210",
              "tenantEmail": "ramesh.kumar@example.com",
              "tenantAdhar": "123456789101",
              "tenantProfilePic": "profile_pic_1.jpg",
              "tenantDocument": "document_1.pdf",
              "permanentAddressId": 1,
              "addressId": 2,
              "tenantRoomNo": 101,
              "isActive": true,
              "lockInPeriod": "12 months",
              "note": "Quiet and responsible tenant.",
              "deposited": 50000.00,
              "returnDeposite": 45000.00,
              "startDate": "2023-08-01 00:00:00",
              "endDate": "2024-07-07 00:00:00",
              "userId": 1,
              "propertyId": 1,
              "roomId": 1,
              "createdBy": 1,
              "lastModifiedBy": 2,
              "creationDate": "2023-07-25 10:15:30",
              "lastModificationDate": "2024-07-07 00:00:00"
            }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tenants", null, {});
  },
};
