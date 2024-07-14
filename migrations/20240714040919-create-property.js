'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      propertyId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      propertyName: {
        type: Sequelize.STRING,
        required: true,
      },
      propertyType: {
        type: Sequelize.STRING,
      },
      propertySize: {
        type: Sequelize.STRING,
      },
      propertyRent: {
        type: Sequelize.DOUBLE,
      },
      propertyStatus: {
        type: Sequelize.INTEGER,
        required: true,
        reference: {
            model: 'Availability_Status_LK',
            key: 'statusId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        name: 'fk_property_status_id',
      },
      propertyPic: {
        type: Sequelize.STRING,
      },
      propertyDescription: {
        type: Sequelize.STRING,
      },
      propertyFacility: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.BIGINT,
        required: true,
        reference: {
          model: 'User',
          key: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        name: 'fk_property_user_id',
      },
      addressId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Address", // Name of the target model
          key: "addressId", // Key in the target model
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        name: "fk_user_address_id",
      },
      note: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.BIGINT,
      },
      lastModifiedBy: {
        type: Sequelize.BIGINT,
      },
      creationDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      lastModificationdDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Properties');
  }
};