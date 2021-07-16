'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Carriers = require('./Carriers')

class Carriers_Services extends Model { }

Carriers_Services.init(
  {
    c_service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    carrier_service_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,

    },
    c_service_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    c_service_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    c_service_added_Date_Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    c_service_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    c_service_addedBy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    c_service_total_service: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    carrier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'carriers',
        key: 'carrier_id'
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Carriers_Services',
    tableName: 'carriers_services'
  }
)

//Carriers_Services.sync({ force: true }).then(re => console.log(re))

/**one Carriers have many services  */

Carriers.hasMany(Carriers_Services, { foreignKey: 'carrier_id' })

Carriers_Services.belongsTo(Carriers, {
  targetKey: 'carrier_id',
  foreignKey: 'carrier_id'
})
/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Carriers_Services === sequelize.models.Carriers_Services)
module.exports = Carriers_Services
