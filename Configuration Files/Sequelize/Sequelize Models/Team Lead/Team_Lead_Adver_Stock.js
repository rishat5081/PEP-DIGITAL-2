"use strict";
const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize"),
  Advertising_Stock_Allocation = require("../Advertisement/Advertising_Stock_Allocation"),
  Team_Lead= require('../Stakeholders/Team_Lead'),
  Supervisor= require('../Stakeholders/Supervisor')

class Team_Lead_Adver_Stock extends Model {}

Team_Lead_Adver_Stock.init(
  {
    team_adver_stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    team_adver_stock_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false
    },
    total_Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    used: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    adver_stock_act_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "advertising_stock_allocation",
        key: "adver_stock_act_id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    team_L_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "team_lead",
        key: "team_L_id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    sup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "supervisor",
        key: "sup_id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: "Team_Lead_Adver_Stock",
    tableName: "teaml_adver_stock"
  }
);

/**one department can have many CSR  */
Advertising_Stock_Allocation.hasMany(Team_Lead_Adver_Stock, {
  foreignKey: "adver_stock_act_id"
});

Team_Lead_Adver_Stock.belongsTo(Advertising_Stock_Allocation, {
  targetKey: "adver_stock_act_id",
  foreignKey: "adver_stock_act_id"
});

/**one team_lead can have many Advertising_Stock_Allocation  */
Team_Lead.hasMany(Team_Lead_Adver_Stock, {
  foreignKey: "team_L_id"
});

Team_Lead_Adver_Stock.belongsTo(Team_Lead, {
  targetKey: "team_L_id",
  foreignKey: "team_L_id"
});

/**one team_lead can have many Advertising_Stock_Allocation  */
Supervisor.hasMany(Team_Lead_Adver_Stock, {
  foreignKey: "sup_id"
});

Team_Lead_Adver_Stock.belongsTo(Supervisor, {
  targetKey: "sup_id",
  foreignKey: "sup_id"
});

// setInterval(()=>{
//     //console.log("Hello")
// },1000)

// setTimeout(()=>{
//     //console.log("Hello")
// },500)
/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Team_Lead_Adver_Stock === sequelize.models.Team_Lead_Adver_Stock)
module.exports = Team_Lead_Adver_Stock;
