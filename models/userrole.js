"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userRoles.init(
    {
      userRoleID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userRole: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRoleDesc: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "userRoles",
      timestamps: false // disable timestamps
    }
  );
  return userRoles;
};