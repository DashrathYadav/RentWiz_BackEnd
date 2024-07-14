/**
 * Users model which containts the table attributes.
 */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        User.belongsTo(models.Address, {
            foreignKey: {
                name: "fk_user_address_id",
                field: "addressId",
            },
            as: "Address",
        });
        User.belongsTo(models.User_Role, {
            foreignKey: {
                name: "fk_user_role_id",
                field: "roleId",
            },
            as: "User_Role",
        });
    }
  }
  User.init(
      {
          userId: {
              type: DataTypes.BIGINT,
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
          },
          loginId: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
          },
          password: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          newPassword: {
              type: DataTypes.STRING,
          },
          fullName: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          mobileNumber: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
          },
          phoneNumber: {
              type: DataTypes.STRING,
              unique: true,
          },
          email: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
          },
          aadharNumber: {
              type: DataTypes.STRING,
              unique: true,
          },
          profilePic: {
              type: DataTypes.STRING,
          },
          document: {
              type: DataTypes.STRING,
          },
          addressId: {
              type: DataTypes.BIGINT,
              allowNull: false,
              references: {
                  model: "Addresses",
                  key: "addressId",
              },
          },
          roleId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                  model: "User_Roles",
                  key: "userRoleID",
              },
          },
          note: {
              type: DataTypes.STRING,
          },
          isActive: {
              type: DataTypes.BOOLEAN,
              defaultValue: false,
          },
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
          },
      },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: false,
    }
  );

  return User;
};
