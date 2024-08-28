'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tenant extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Tenant.belongsTo(models.Property, {
                foreignKey: {
                name: "fk_tenant_property_id",
                field: "propertyId"
                },
                as: "Property"
            });
            Tenant.belongsTo(models.User, {
                foreignKey: {
                name: "fk_tenant_user_id",
                field: "userId"
                },
                as: "User"
            });
            Tenant.belongsTo(models.Room, {
                foreignKey: {
                name: "fk_tenant_room_id",
                field: "roomId"
                },
                as: "Room"
            });
            Tenant.belongsTo(models.Address, {
                foreignKey: {
                  name: "fk_tenant_address_id",
                  field: "addressId",
                },
                as: "Address",
              });
        }
    }
    Tenant.init({
        tenantId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        tenantName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tenantMobile: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        tenantEmail: DataTypes.STRING,
        tenantAdhar: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        tenantProfilePic: DataTypes.STRING,
        tenantDocument: DataTypes.STRING,
        permanentAddressId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        addressId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "Address",
                key: "addressId",
            },
        },
        tenantRoomNo :{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        lockInPeriod: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note: DataTypes.STRING,
        deposited: DataTypes.DOUBLE,
        returnDeposite: DataTypes.DOUBLE,
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: DataTypes.DATE,
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            reference: {
                model: 'User',
                key: 'userId'
            },
        },
        propertyId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'Property',
                key: 'propertyId'
            }
        },
        roomId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'Room',
                key: 'roomId'
            }
        },
        createdBy: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        lastModifiedBy: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        creationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        lastModificationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Tenant',
        tableName: "Tenants",
        timestamps: false,
    });
    return Tenant;
};