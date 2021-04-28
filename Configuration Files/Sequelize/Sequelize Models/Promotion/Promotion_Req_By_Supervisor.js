'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  City = require('../City/City'),
  Supervisor = require('../Stakeholders/Supervisor')

class Promotion_Req_By_Supervisor extends Model { }

Promotion_Req_By_Supervisor.init(
  {
    prom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    prom_uuid: {
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
    prom_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prom_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prom_requested_Date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    prom_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'city',
        key: 'city_id'
      },
      validate: {
        max: 11,
        isNumeric: true
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    sup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'supervisor',
        key: 'sup_id'
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
    modelName: 'Promotion_Req_By_Supervisor',
    tableName: 'promotion_req_by_supervisor'
  }
)

/**
 * One City can have many promotions
 */
City.hasMany(Promotion_Req_By_Supervisor, { foreignKey: 'city_id' })

Promotion_Req_By_Supervisor.belongsTo(City, {
  targetKey: 'city_id',
  foreignKey: 'city_id'
})



/**
 * One Supervisor can have many promotions
 */
Supervisor.hasMany(Promotion_Req_By_Supervisor, { foreignKey: 'sup_id' })

Promotion_Req_By_Supervisor.belongsTo(Supervisor, {
  targetKey: 'sup_id',
  foreignKey: 'sup_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
// console.log(
//   Promotion_Req_By_Supervisor === sequelize.models.Promotion_Req_By_Supervisor
// )
module.exports = Promotion_Req_By_Supervisor
