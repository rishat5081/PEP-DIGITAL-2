"use strict";
const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize");

class Permissions extends Model { }

Permissions.init(
  {
    permmission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true,
      },
    },
    permmission_uuid: {
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
    d_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    permission_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    controller: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    edit: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    delete_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    add_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    update_permission: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: "Permissions",
    tableName: "permissions",
  }
);

//Department.sync({ force: true }).then(re => //console.log(re))

/**Super Admin will handle many Departments */

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Department === sequelize.models.Department)
module.exports = Permissions;
