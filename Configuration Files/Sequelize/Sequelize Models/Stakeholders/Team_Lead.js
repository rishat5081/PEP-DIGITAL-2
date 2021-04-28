'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  User_Login_Information = require('../Users Login/User_Login_Information'),
  Supervisor = require('./Supervisor'),
  City_Areas = require('../City/City_Areas')

class Team_Lead extends Model { }

Team_Lead.init(
  {
    team_L_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    team_L_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,

    },
    team_L_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_L_userProfilePic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_L_contact: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_L_target: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_L_salary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_L_commission: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_L_username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    team_L_isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    team_L_isPaused: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    city_area_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'city_area',
        key: 'city_area_id'
      },

      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    sup_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'supervisor',
        key: 'sup_id'
      },

      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    login_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'user_login_information',
        key: 'login_id'
      },

      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Team_Lead',
    tableName: 'team_lead'
  }
)

/**
 * One user can have one login credential
 */
User_Login_Information.hasOne(Team_Lead, {
  foreignKey: 'login_id'
})

Team_Lead.belongsTo(User_Login_Information, {
  targetKey: 'login_id',
  foreignKey: 'login_id'
})

/**
 * One City_Areas can have many team lead
 */
City_Areas.hasMany(Team_Lead, {
  foreignKey: 'city_area_id'
})

Team_Lead.belongsTo(City_Areas, {
  targetKey: 'city_area_id',
  foreignKey: 'city_area_id'
})

/**
 * One Supervisor can have many team lead
 */
Supervisor.hasMany(Team_Lead, {
  foreignKey: 'sup_id'
})

Team_Lead.belongsTo(Supervisor, {
  targetKey: 'sup_id',
  foreignKey: 'sup_id'
})

// setInterval(()=>{
//     //console.log("Hello")
// },1000)

// setTimeout(()=>{
//     //console.log("Hello")
// },500)
/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Team_Lead === sequelize.models.Team_Lead)
module.exports = Team_Lead
