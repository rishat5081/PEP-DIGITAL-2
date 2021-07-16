'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Zone = require('../Zone')

class City extends Model { }

City.init(
  {
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    city_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,

    },
    city_name: {
      type: DataTypes.TEXT,
      allowNull: true
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
    city_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    zone_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'zone',
        key: 'zone_id'
      }
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'City',
    tableName: 'city'
  }
)
/**
 * One zone will have many cities
 */
Zone.hasMany(City, {
  foreignKey: 'zone_id'
})

City.belongsTo(Zone, {
  targetKey: 'zone_id',
  foreignKey: 'zone_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(City === sequelize.models.City)
module.exports = City
