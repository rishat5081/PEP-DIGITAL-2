// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   User_Role = require("./User_Role");
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Role_ExtraInfo extends Model {}

  Role_ExtraInfo.init(
    {
      role_creden_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role_creden_uuid: {
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
      target: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      salary: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      commission: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      user_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true,
        },
        references: {
          model: "user_login_role",
          key: "user_role_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Role_ExtraInfo",
      tableName: "role_extrainfo",
    }
  );

  Role_ExtraInfo.associate = (models) => {
    models.User_Role.hasOne(Role_ExtraInfo, {
      foreignKey: "user_role_id",
    });

    Role_ExtraInfo.belongsTo(models.User_Role, {
      targetKey: "user_role_id",
      foreignKey: "user_role_id",
    });
  };

  // User_Role.hasOne(Role_ExtraInfo, {
  //   foreignKey: "user_role_id"
  // });

  // Role_ExtraInfo.belongsTo(User_Role, {
  //   targetKey: "user_role_id",
  //   foreignKey: "user_role_id"
  // });
  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(User_Login_Information === sequelize.models.User_Login_Information)

  // module.exports = Role_ExtraInfo;
  return Role_ExtraInfo;
};
