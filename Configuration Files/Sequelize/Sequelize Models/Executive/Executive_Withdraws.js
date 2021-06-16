'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Field_Executive = require('../Stakeholders/Field_Executive'),
  Executive_Pending_Earning = require('./Executive_Pending_Earning')

class Executive_Withdraws extends Model { }

Executive_Withdraws.init(
  {
    field_exe_with_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    field_exe_with_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,

    },
    withdraw_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'field_executive',
        key: 'field_id'
      },
      validate: {
        max: 11,
        isNumeric: true
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    field_exe_earn_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'field_executive_pending_earning',
        key: 'field_exe_earn_id'
      },
      validate: {
        max: 11,
        isNumeric: true
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Executive_Withdraws',
    tableName: 'field_executive_withdraws'
  }
)

/**
 * One field executive have many withdraws
 */

Field_Executive.hasMany(Executive_Withdraws, {
  foreignKey: 'field_id'
})

Executive_Withdraws.belongsTo(Field_Executive, {
  targetKey: 'field_id',
  foreignKey: 'field_id'
})

/**
 * One field executive earning will have one withdraw
 */

Executive_Pending_Earning.hasOne(Executive_Withdraws, {
  foreignKey: 'field_exe_earn_id'
})

Executive_Withdraws.belongsTo(Executive_Pending_Earning, {
  targetKey: 'field_exe_earn_id',
  foreignKey: 'field_exe_earn_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Executive_Withdraws === sequelize.models.Executive_Withdraws)
module.exports = Executive_Withdraws
