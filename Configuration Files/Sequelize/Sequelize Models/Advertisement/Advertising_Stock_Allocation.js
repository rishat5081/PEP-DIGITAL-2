const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Supervisor = require('../Stakeholders/Supervisor'),
  Advertisement_Stock = require('./Advertisement_Stock')

class Advertising_Stock_Allocation extends Model { }

Advertising_Stock_Allocation.init(
  {
    adver_stock_act_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    adver_stock_alloc_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,
       
    },
    adver_stock_act_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    adver_stock_act_descritpion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    adver_stock_act_total_Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    adver_stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      validate: {
        max: 11,
        isNumeric: true
      },
      references: {
        model: 'advertising_stock',
        key: 'adver_stock_id'
      }
    },
    sup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      validate: {
        max: 11,
        isNumeric: true
      },
      references: {
        model: 'supervisor',
        key: 'sup_id'
      }
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Advertising_Stock_Allocation',
    tableName: 'advertising_stock_allocation'
  }
)
/**
 * one supervisor got many stock which is allocated to him
 */
Supervisor.hasMany(Advertising_Stock_Allocation, {
  foreignKey: 'sup_id'
})

Advertising_Stock_Allocation.belongsTo(Supervisor, {
  targetKey: 'sup_id',
  foreignKey: 'sup_id'
})

/**
 * which stock is allocated to the supervisor is record here
 */
Advertisement_Stock.hasMany(Advertising_Stock_Allocation, {
  foreignKey: 'adver_stock_id'
})

Advertising_Stock_Allocation.belongsTo(Advertisement_Stock, {
  targetKey: 'adver_stock_id',
  foreignKey: 'adver_stock_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
// console.log(
//   Advertising_Stock_Allocation === sequelize.models.Advertising_Stock_Allocation
// )
module.exports = Advertising_Stock_Allocation
