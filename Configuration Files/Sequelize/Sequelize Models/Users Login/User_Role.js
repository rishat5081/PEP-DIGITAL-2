"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  // const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  //   sequelize = require("../../Sequelize");

  class User_Role extends Model {}

  User_Role.init(
    {
      user_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_role_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      type_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "User_Role",
      tableName: "user_login_role",
    }
  );
  User_Role.associate = (models) => {
    User_Role.belongsToMany(models.Permissions, {
      through: models.Permission_Role_Assosiate,
      foreignKey: "user_role_id",
    });
  };

  // module.exports = User_Role;
  return User_Role;
};
