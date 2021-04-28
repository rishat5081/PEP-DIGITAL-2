'use strict'
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../../Sequelize')

class SuperAdmin_Department_Logs extends Model {}

SuperAdmin_Department_Logs.init(
  {
    sa_on_Depart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    d_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    d_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    d_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    d_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comp_access_id: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    d_added_Date_Time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'SuperAdmin_Department_Logs',
    tableName: 'sa_logs_ondepartment'
  }
)

//SuperAdmin_Department_Logs.sync({ force: true }).then(re => console.log(re))

// setInterval(()=>{
//     console.log("Hello")
// },1000)

// setTimeout(()=>{
//     console.log("Hello")
// },500)
/*
 *boolean return type which will indicate that the table is defined or not
 */
// console.log(
//   SuperAdmin_Department_Logs === sequelize.models.SuperAdmin_Department_Logs
// )
module.exports = SuperAdmin_Department_Logs
