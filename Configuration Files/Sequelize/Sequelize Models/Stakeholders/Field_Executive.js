'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  User_Login_Information = require('../Users Login/User_Login_Information'),
  Team_Lead = require('./Team_Lead')
const User_Role = require('../Users Login/User_Role')

class Field_Executive extends Model { }

Field_Executive.init(
  {
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    field_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,

    },
    field_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    field_userProfilePic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    field_contact: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    field_target: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    field_DOB: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    field_salary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    salaryStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    field_commission: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    field_username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    field_isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    field_isPaused: {
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
    team_L_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'team_lead',
        key: 'team_L_id'
      },

      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Field_Executive',
    tableName: 'field_executive'
  }
)

/**
 * One login table will have only user
 */
User_Login_Information.hasOne(Field_Executive, {
  foreignKey: 'login_id'
})

Field_Executive.belongsTo(User_Login_Information, {
  targetKey: 'login_id',
  foreignKey: 'login_id'
})

/**
 * One team lead have many field executive
 */
Team_Lead.hasMany(Field_Executive, {
  foreignKey: 'team_L_id'
})

Field_Executive.belongsTo(Team_Lead, {
  targetKey: 'team_L_id',
  foreignKey: 'team_L_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Field_Executive === sequelize.models.Field_Executive)
module.exports = Field_Executive







