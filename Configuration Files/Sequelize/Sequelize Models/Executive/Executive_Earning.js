"use strict";
const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize"),
  List_Activities = require("../Lists of Packages/Activities"),
  Field_Executive = require("../Stakeholders/Field_Executive");

class Executive_Earning extends Model {}

Executive_Earning.init(
  {
    field_exe_earn_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true,
      },
    },
    field_exe_earn_uuid: {
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
    withdrawed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "field_executive",
        key: "field_id",
      },
      validate: {
        max: 11,
        isNumeric: true,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    list_act_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "list_activities",
        key: "list_act_id",
      },
      validate: {
        max: 11,
        isNumeric: true,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: "Executive_Earning",
    tableName: "field_executive_earning",
  }
);

/**
 * one Field_Executive can have many earning
 */
Field_Executive.hasMany(Executive_Earning, {
  foreignKey: "field_id",
});

Executive_Earning.belongsTo(Field_Executive, {
  targetKey: "field_id",
  foreignKey: "field_id",
});

/**
 * one Field_Executive can have many earning
 */
List_Activities.hasMany(Executive_Earning, {
  foreignKey: "list_act_id",
});

Executive_Earning.belongsTo(List_Activities, {
  targetKey: "list_act_id",
  foreignKey: "list_act_id",
});
/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Executive_Earning === sequelize.models.Executive_Earning)
module.exports = Executive_Earning;
