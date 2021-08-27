'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  User_Login_Information = require('../Users Login/User_Login_Information'),
  Manager = require('./Manager')

class Supervisor extends Model { }

Supervisor.init(
  {
    sup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    sup_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,
       
    },
    sup_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sup_userProfilePic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sup_contact: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sup_target: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sup_salary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sup_commission: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sup_DOB: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sup_username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sup_isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    sup_isPaused: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    login_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'user_login_information',
        key: 'login_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    man_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'managers',
        key: 'man_id'
      },
    
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Supervisor',
    tableName: 'supervisor'
  }
)

/**
 * One user can have one login credential
 */
User_Login_Information.hasOne(Supervisor, {
  foreignKey: 'login_id'
})

Supervisor.belongsTo(User_Login_Information, {
  targetKey: 'login_id',
  foreignKey: 'login_id'
})

/**
 * One manager can have many supervisor
 */
Manager.hasOne(Supervisor, {
  foreignKey: 'man_id'
})

Supervisor.belongsTo(Manager, {
  targetKey: 'man_id',
  foreignKey: 'man_id'
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
//console.log(Supervisor === sequelize.models.Supervisor)
module.exports = Supervisor
