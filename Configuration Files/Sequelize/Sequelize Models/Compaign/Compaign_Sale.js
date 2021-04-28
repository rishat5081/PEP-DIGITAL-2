'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Compaign = require('./Compaigns'),
  Field_Executive = require('../Stakeholders/Field_Executive'),
  Agency_Info = require('../Agency Models/Agency_Info'),
  Compaign_Sale = sequelize.define(
    'Compaign_Sale',
    {
      comp_sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      saomp_sale_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
         
      },
      comp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: 'compaigns',
          key: 'comp_id'
        }
      },
      field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: 'field_executive',
          key: 'field_id'
        }
      },
      sale_total_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          max: 15
        }
      },
      recieved_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          max: 15
        }
      },
      agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: 'agency_info',
          key: 'agency_id'
        }
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: 'Compaign_Sale',
      tableName: 'compaign_sales'
    }
  )

/**
 * one compaign can have many activities
 */
Compaign.hasMany(Compaign_Sale, {
  foreignKey: 'comp_id'
})

Compaign_Sale.belongsTo(Compaign, {
  targetKey: 'comp_id',
  foreignKey: 'comp_id'
})

/**
 * One field executive will generate many compaign activities
 */
Field_Executive.hasMany(Compaign_Sale, {
  foreignKey: 'field_id'
})

Compaign_Sale.belongsTo(Field_Executive, {
  targetKey: 'field_id',
  foreignKey: 'field_id'
})

/**
 * One field executive will generate many compaign activities on many agencies
 */
Agency_Info.hasMany(Compaign_Sale, {
  foreignKey: 'agency_id'
})

Compaign_Sale.belongsTo(Agency_Info, {
  targetKey: 'agency_id',
  foreignKey: 'agency_id'
})
/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Compaign_Sale === sequelize.models.Compaign_Sale)
module.exports = Compaign_Sale
