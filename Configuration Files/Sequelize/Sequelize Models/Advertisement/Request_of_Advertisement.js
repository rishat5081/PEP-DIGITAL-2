'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  GM_Company = require('../Stakeholders/GM_Company'),
  Manager = require('../Stakeholders/Manager')

class Request_of_Advertisement extends Model { }

Request_of_Advertisement.init(
  {
    req_adver: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    request_of_adver_uuid: {
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
    req_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    req_approve: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    req_decline: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    req_decline_descrip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    req_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    req_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    req_type: {
      type: DataTypes.TEXT,
      allowNull: true
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
    },
    gm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'company_gm_info',
        key: 'gm_id'
      },
   
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Request_of_Advertisement',
    tableName: 'request_of_advertisement'
  }
)

//Request_of_Advertisement.sync({ force: true }).then(re => console.log(re))

/**
 * Manager will approve and decline the requests
 */
GM_Company.hasMany(Request_of_Advertisement, { foreignKey: 'gm_id' })

Request_of_Advertisement.belongsTo(GM_Company, {
  targetKey: 'gm_id',
  foreignKey: 'gm_id'
})

/**Manager will add the request to the Gm Company
 * and
 * these requests are special which need to be handle at the VIP level */

Manager.hasMany(Request_of_Advertisement, { foreignKey: 'man_id' })

Request_of_Advertisement.belongsTo(Manager, {
  targetKey: 'man_id',
  foreignKey: 'man_id'
})

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
//   Request_of_Advertisement === sequelize.models.Request_of_Advertisement
// )
module.exports = Request_of_Advertisement
