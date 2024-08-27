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
              "boardingDate": "2023-08-01 00:00:00",
              "leavingDate": "2024-07-07 00:00:00",
              "userId": 1,
              "propertyId": 1,
              "roomId": 1,
              "createdBy": 1,
              "lastModifiedBy": 2,
              "creationDate": "2023-07-25 10:15:30",
              "lastModificationDate": "2024-07-07 00:00:00",
              "password":'HelloWorld'
            },
            {
                "tenantId": 2,
                "tenantName": "Suresh Singh",
                "tenantMobile": "9123456789",
                "tenantEmail": "suresh.singh@example.com",
                "tenantAdhar": "234567891011",
                "tenantProfilePic": "profile_pic_2.jpg",
                "tenantDocument": "document_2.pdf",
                "permanentAddressId": 2,
                "addressId": 3,
                "tenantRoomNo": 102,
                "isActive": true,
                "lockInPeriod": "6 months",
                "note": "Friendly and cooperative tenant.",
                "deposited": 60000.00,
                "returnDeposite": 55000.00,
                "boardingDate": "2023-06-15 00:00:00",
                "leavingDate": "2024-06-14 00:00:00",
                "userId": 2,
                "propertyId": 1,
                "roomId": 2,
                "createdBy": 2,
                "lastModifiedBy": 1,
                "creationDate": "2023-06-10 09:30:45",
                "lastModificationDate": "2024-06-14 00:00:00",
                "password": "SecurePass123"
              },
              {
                "tenantId": 3,
                "tenantName": "Anjali Verma",
                "tenantMobile": "9987654321",
                "tenantEmail": "anjali.verma@example.com",
                "tenantAdhar": "345678910112",
                "tenantProfilePic": "profile_pic_3.jpg",
                "tenantDocument": "document_3.pdf",
                "permanentAddressId": 3,
                "addressId": 4,
                "tenantRoomNo": 103,
                "isActive": true,
                "lockInPeriod": "18 months",
                "note": "Neat and punctual tenant.",
                "deposited": 70000.00,
                "returnDeposite": 65000.00,
                "boardingDate": "2023-05-10 00:00:00",
                "leavingDate": "2024-11-09 00:00:00",
                "userId": 3,
                "propertyId": 1,
                "roomId": 3,
                "createdBy": 1,
                "lastModifiedBy": 3,
                "creationDate": "2023-05-05 14:20:10",
                "lastModificationDate": "2024-11-09 00:00:00",
                "password": "MySafePwd789"
              }              
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tenants", null, {});
  },
};
