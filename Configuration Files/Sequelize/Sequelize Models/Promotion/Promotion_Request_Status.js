'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Manager = require('../Stakeholders/Manager'),
  Promotion_Req_By_Supervisor = require('./Promotion_Req_By_Supervisor')

class Promotion_Request_Status extends Model {}

Promotion_Request_Status.init(
  {
    prom_req_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    prom_req_uuid:{
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
    prom_req_approve: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    prom_req_decline: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    prom_req_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    prom_req_approve_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prom_req_decline_desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'promotion_req_by_supervisor',
        key: 'prom_id'
      },
      validate: {
        max: 11,
        isNumeric: true
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
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
    modelName: 'Promotion_Request_Status',
    tableName: 'promotion_requests_status'
  }
)

/**
 * One promotion can be start from request approved by Managers
 */
Manager.hasMany(Promotion_Request_Status, { foreignKey: 'man_id' })

Promotion_Request_Status.belongsTo(Manager, {
  targetKey: 'man_id',
  foreignKey: 'man_id'
})
/**
 * One promotion can be start from request approved
 */
Promotion_Req_By_Supervisor.hasMany(Promotion_Request_Status, {
  foreignKey: 'prom_id'
})

Promotion_Request_Status.belongsTo(Promotion_Req_By_Supervisor, {
  targetKey: 'prom_id',
  foreignKey: 'prom_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
// console.log(
//   Promotion_Request_Status === sequelize.models.Promotion_Request_Status
// )
module.exports = Promotion_Request_Status
