'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  City_and_Supervisor_associate = require('./City_and_Supervisor_associate')

class City_Areas extends Model { }

City_Areas.init(
  {
    city_area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    city_area_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,

    },
    city_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    paused: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    city_supp_assos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      validate: {
        max: 11,
        isNumeric: true
      },
      references: {
        model: 'city_sup_assos',
        key: 'city_supp_assos_id'
      }
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'City_Areas',
    tableName: 'city_area'
  }
)

/**
 * one supervisor and city will have many city areas
 */

City_and_Supervisor_associate.hasMany(City_Areas, {
  foreignKey: 'city_supp_assos_id'
})

City_Areas.belongsTo(City_and_Supervisor_associate, {
  targetKey: 'city_supp_assos_id',
  foreignKey: 'city_supp_assos_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(City_Areas === sequelize.models.City_Areas)
module.exports = City_Areas
