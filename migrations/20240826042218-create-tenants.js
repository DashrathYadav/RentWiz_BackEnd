'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tenants', {
            tenantId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tenantName: {
                type: Sequelize.STRING,
                required: true
            },
            tenantMobile: {
                type: Sequelize.STRING,
                required: true,
                unique: true
            },
            tenantEmail: Sequelize.STRING,
            tenantAdhar: {
                type: Sequelize.STRING,
                required: true,
                unique: true
            },
            tenantProfilePic: Sequelize.STRING,
            tenantDocument: Sequelize.STRING,
            permanentAddressId: {
                type: Sequelize.BIGINT,
                required: true
            },
            addressId: {
                type: Sequelize.BIGINT,
                required: true,
                references: {
                    model: "Address",
                    key: "addressId",
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                name: "fk_tenant_address_id",
            },
            tenantRoomNo: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            lockInPeriod: {
                type: Sequelize.STRING,
                allowNull: false
            },
            note: Sequelize.STRING,
            deposited: Sequelize.DOUBLE,
            returnDeposite: Sequelize.DOUBLE,
            boardingDate: {
                type: Sequelize.DATE,
                required: true,
                defaultValue: Sequelize.NOW,
            },
            leavingDate: Sequelize.DATE,
            userId: {
                type: Sequelize.BIGINT,
                required: true,
                reference: {
                    model: 'User',
                    key: 'userId'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                name: "fk_tenant_user_id"
            },
            propertyId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Property',
                    key: 'propertyId'
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
                name: "fk_tenant_property_id",
            },
            roomId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'Room',
                    key: 'roomId'
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
                name: "fk_tenant_room_id",
            },
            password:{
                type: Sequelize.STRING,
                allowNull: false,
                required:true
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
                defaultValue: Sequelize.NOW
            },
            lastModificationDate: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Tenants');
    }
};