'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.Address, {
        foreignKey: {
          name: "fk_user_address_id",
          field: "addressId",
        },
        as: "Address",
      });
        Property.belongsTo(models.User, {
            foreignKey: {
            name: "fk_user_id",
            field: "userId",
            },
            as: "User",
        });
        Property.belongsTo(models.Availability_Status_LK, {
            foreignKey: {
            name: "fk_status_id",
            field: "propertyStatus",
            },
            as: "Availability_Status_LK",
        });
    }
  }
  Property.init({
        propertyId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        propertyName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        propertyType: DataTypes.STRING,
        propertySize: DataTypes.STRING,
        propertyRent: DataTypes.DOUBLE,
        propertyStatus: {
          type: DataTypes.STRING,
          allowNull: false,
          reference : {
            model: 'Availability_Status_LK',
            key: 'statusId'
          },
      },
    propertyPic: DataTypes.STRING,
    propertyDescription: DataTypes.STRING,
    propertyFacility: DataTypes.STRING,
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
        reference : {
            model: 'User',
            key: 'userId'
        },
    },
    addressId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      reference : {
        model: 'Address',
        key: 'addressId'
      }
    },
    note: DataTypes.STRING,
    createdBy: {
      type: DataTypes.BIGINT,
    },
    lastModifiedBy: {
      type: DataTypes.BIGINT,
    },
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    lastModificationdDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'property',
    tableName: "Properties",
    timestamps: false,
  });
  return Property;
};

