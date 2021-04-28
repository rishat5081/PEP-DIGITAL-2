"use strict";
const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize"),
  Field_Executive = require("../Stakeholders/Field_Executive"),
  Agency_Info = require("../Agency Models/Agency_Info"),
  Compaigns = require("../Compaign/Compaigns");

class Activities extends Model { }

Activities.init(
  {
    list_act_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true,
      },
    },
    list_act_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,
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
    comp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,

      references: {
        model: "compaigns",
        key: "comp_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    list_act_checked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    bank_sale: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    bank_deposited: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    bank_deposited_referenceNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bank_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    accountant_approve: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    account_approve_datetime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    account_decline: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    account_decline_dateTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    account_decline_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: "Activities",
    tableName: "Activities",
  }
);

/**
 * field executive will have many activites by reading list
 * to each agency
 */
Field_Executive.hasMany(Activities, {
  foreignKey: "field_id",
});

Activities.belongsTo(Field_Executive, {
  targetKey: "field_id",
  foreignKey: "field_id",
});

/**
 * field executive will have many activites by reading list
 * to each agency
 */
Agency_Info.hasMany(Activities, {
  foreignKey: "agency_id",
});

Activities.belongsTo(Agency_Info, {
  targetKey: "agency_id",
  foreignKey: "agency_id",
});

/**
 * field executive will have allocate the which activities
 * and will have which activity is going on and by reading lists
 * to track all the lists
 **/
Compaigns.hasMany(Activities, {
  foreignKey: "comp_id",
});

Activities.belongsTo(Compaigns, {
  targetKey: "comp_id",
  foreignKey: "comp_id",
});

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Activities === sequelize.models.Activities)
module.exports = Activities;
