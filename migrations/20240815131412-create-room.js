'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      roomId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
        roomNo: {
            type: Sequelize.INTEGER,
            required: true,
        },
        propertyId: {
            type: Sequelize.BIGINT,
            required: true,
            references: {
                model: 'Property',
                key: 'propertyId'
            },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          name: "fk_property_id",
        },
        userId: {
            type: Sequelize.BIGINT,
            required: true,
            references: {
                model: 'User',
                key: 'userId'
            },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          name: "fk_user_id",
        },
        roomType: {
            type: Sequelize.STRING,
        },
        roomSize: {
            type: Sequelize.STRING,
        },
        roomRent: {
            type: Sequelize.DOUBLE,
        },
        currencyId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Currency_LK',
                key: 'currencyId'
            },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          name: "fk_currency_id",
        },
        roomStatus: {
            type: Sequelize.INTEGER,
            required: true,
        },
        roomPic: {
            type: Sequelize.STRING,
        },
        roomDescription: {
            type: Sequelize.STRING,
        },
        roomFacility: {
            type: Sequelize.STRING,
        },
        addressId: {
            type: Sequelize.BIGINT,
            references: {
                model: 'Address',
                key: 'addressId'
            },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          name: "fk_address_id",
        },
        roomCapacity: {
            type: Sequelize.INTEGER,
        },
        currentTenantCount: {
            type: Sequelize.INTEGER,
        },
        note: {
            type: Sequelize.STRING,
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
        lastModificationDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};
