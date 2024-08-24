'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.:
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Room.belongsTo(models.Property, {
            foreignKey: {
            name: "fk_property_id",
            field: "propertyId"
            },
            as: "Property"
        });
        Room.belongsTo(models.User, {
            foreignKey: {
            name: "fk_user_id",
            field: "userId"
            },
            as: "User"
        });
        Room.belongsTo(models.Currency_LK, {
            foreignKey: {
            name: "fk_currency_id",
            field: "currencyId"
            },
            as: "Currency_LK"
        });
        Room.belongsTo(models.Address, {
            foreignKey: {
            name: "fk_address_id",
            field: "addressId"
            },
            as: "Address"
        });
    }
  }
  Room.init({
    roomId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    roomNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    propertyId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      references: {
        model: 'Property',
        key: 'propertyId'
      }
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    roomSize: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roomRent: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    currencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Currency_LK',
            key: 'currencyId'
        }
    },
    roomStatus: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomPic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roomDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    roomFacility: {
      type: DataTypes.STRING,
      allowNull: true
    },
    addressId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      reference : {
        model: 'Address',
        key: 'addressId'
      }
    },
    roomCapacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    currentTenantCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
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
    modelName: 'Room',
    tableName: 'Rooms',
    timestamps: false
  });

  return Room;
};