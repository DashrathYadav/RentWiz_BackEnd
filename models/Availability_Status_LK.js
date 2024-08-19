'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Availability_Status_LK extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Availability_Status_LK.init({
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    statusName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Availability_Status_LK',
    tableName: 'Availability_Status_LK',
    timestamps: false,
  });
  return Availability_Status_LK;
};