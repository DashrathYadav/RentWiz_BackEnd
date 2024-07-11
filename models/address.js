"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  address.init(
    {
      addressId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      street: {
        type: DataTypes.STRING,
      },
      landMark: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.STRING,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "address",
      timestamps: false, // disable timestamps
    }
  );
  return address;
};
