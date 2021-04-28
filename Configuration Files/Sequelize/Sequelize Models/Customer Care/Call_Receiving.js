'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Customer_Care_Respresentative = require('../Stakeholders/Customer_Care_Respresentative')

class Call_Receiving extends Model { }

Call_Receiving.init(
  {
    receive_call_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    call_recieve_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,
       
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    isPaused: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    receive_call_solved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    receive_call_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    receive_call_problem_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    receive_call_solution: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cust_care_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'cust_care_csr',
        key: 'cust_care_id'
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
    modelName: 'Call_Receiving',
    tableName: 'receiving_calls'
  }
)

/**
 * One CSR can make or recieve many calls
 */
Customer_Care_Respresentative.hasMany(Call_Receiving, { foreignKey: 'cust_care_id' })

Call_Receiving.belongsTo(Customer_Care_Respresentative, {
  targetKey: 'cust_care_id',
  foreignKey: 'cust_care_id'
})


/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Call_Receiving === sequelize.models.Call_Receiving)
module.exports = Call_Receiving
