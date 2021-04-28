'use strict'
const { DataTypes, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Customer_Care_Respresentative = require('../Stakeholders/Customer_Care_Respresentative'),
  Agency_Info = require('../Agency Models/Agency_Info'),
  Customer_Care_Activities = sequelize.define(
    'Customer_Care_Activities',
    {
      cust_c_act_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      cust_c_act_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
         
      },
      cust_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      cust_care_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: 'cust_care_csr',
          key: 'cust_care_id'
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
      },
      feedback: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      totalCallTime: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: 'Customer_Care_Activities',
      tableName: 'cust_care_activities'
    }
  )

/**
 * one CSR will make many activities
 */
Customer_Care_Respresentative.hasMany(Customer_Care_Activities, {
  foreignKey: 'cust_care_id'
})

Customer_Care_Activities.belongsTo(Customer_Care_Respresentative, {
  targetKey: 'cust_care_id',
  foreignKey: 'cust_care_id'
})

/**
 * one CSR will call many agencies
 */
Agency_Info.hasMany(Customer_Care_Activities, {
  foreignKey: 'agency_id'
})

Customer_Care_Activities.belongsTo(Agency_Info, {
  targetKey: 'agency_id',
  foreignKey: 'agency_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
// console.log(
//   Customer_Care_Activities === sequelize.models.Customer_Care_Activities
// )
module.exports = Customer_Care_Activities
