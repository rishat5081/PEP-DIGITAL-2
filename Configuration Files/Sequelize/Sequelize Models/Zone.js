'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize')
const sequelize = require('../Sequelize')

class Zone extends Model { }

Zone.init(
  {
    zone_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    zone_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,
       
    },
    paused: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    zone_name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Zone',
    tableName: 'zone'
  }
)

//Zone.sync({ force: true }).then(re => //console.log(re))

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Zone === sequelize.models.Zone)
module.exports = Zone
