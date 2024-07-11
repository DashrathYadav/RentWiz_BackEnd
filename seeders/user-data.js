"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        userId: 1,
        loginId: "john_doe",
        password: "password123",
        newPassword: "newpassword123",
        fullName: "John Doe",
        mobileNumber: "1234567890",
        phoneNumber: "0987654321",
        email: "john.doe@example.com",
        aadharNumber: "123456789012",
        profilePic: "john_doe.jpg",
        document: "john_doe_doc.pdf",
        address: 1,
        roleId: 1,
        note: "First user",
        isActive: true,
        createdBy: 1,
        lastModifiedBy: 1,
        creationDate: "2024-07-07 00:00:00",
        lastModificationdDate: "2024-07-07 00:00:00",
      },
      {
        userId: 2,
        loginId: "jane_smith",
        password: "password456",
        newPassword: "newpassword456",
        fullName: "Jane Smith",
        mobileNumber: "2345678901",
        phoneNumber: "1987654321",
        email: "jane.smith@example.com",
        aadharNumber: "234567890123",
        profilePic: "jane_smith.jpg",
        document: "jane_smith_doc.pdf",
        address: 2,
        roleId: 2,
        note: "Second user",
        isActive: true,
        createdBy: 1,
        lastModifiedBy: 1,
        creationDate: "2024-07-07 00:00:00",
        lastModificationdDate: "2024-07-07 00:00:00",
      },
      {
        userId: 3,
        loginId: "alice_jones",
        password: "password789",
        newPassword: "newpassword789",
        fullName: "Alice Jones",
        mobileNumber: "3456789012",
        phoneNumber: "2987654321",
        email: "alice.jones@example.com",
        aadharNumber: "345678901234",
        profilePic: "alice_jones.jpg",
        document: "alice_jones_doc.pdf",
        address: 3,
        roleId: 3,
        note: "Third user",
        isActive: true,
        createdBy: 1,
        lastModifiedBy: 1,
        creationDate: "2024-07-07 00:00:00",
        lastModificationdDate: "2024-07-07 00:00:00",
      },
      {
        userId: 4,
        loginId: "bob_brown",
        password: "password101",
        newPassword: "newpassword101",
        fullName: "Bob Brown",
        mobileNumber: "4567890123",
        phoneNumber: "3987654321",
        email: "bob.brown@example.com",
        aadharNumber: "456789012345",
        profilePic: "bob_brown.jpg",
        document: "bob_brown_doc.pdf",
        address: 4,
        roleId: 4,
        note: "Fourth user",
        isActive: true,
        createdBy: 1,
        lastModifiedBy: 1,
        creationDate: "2024-07-07 00:00:00",
        lastModificationdDate: "2024-07-07 00:00:00",
      },
      {
        userId: 5,
        loginId: "charlie_davis",
        password: "password202",
        newPassword: "newpassword202",
        fullName: "Charlie Davis",
        mobileNumber: "5678901234",
        phoneNumber: "4987654321",
        email: "charlie.davis@example.com",
        aadharNumber: "567890123456",
        profilePic: "charlie_davis.jpg",
        document: "charlie_davis_doc.pdf",
        address: 5,
        roleId: 5,
        note: "Fifth user",
        isActive: true,
        createdBy: 1,
        lastModifiedBy: 1,
        creationDate: "2024-07-07 00:00:00",
        lastModificationdDate: "2024-07-07 00:00:00",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
