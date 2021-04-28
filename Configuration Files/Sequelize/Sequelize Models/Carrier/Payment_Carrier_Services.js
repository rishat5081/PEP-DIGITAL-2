'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Carriers = require('./Carriers')

class Payment_Carrier_Services extends Model { }

Payment_Carrier_Services.init(
  {
    c_s_payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    payment_c_ser_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,
       
    },
    c_s_payment_totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    c_s_payment_pending: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    c_service_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    c_s_payment_paid: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    carrier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      validate: {
        max: 11,
        isNumeric: true
      },
      references: {
        model: 'carriers',
        key: 'carrier_id'
      }
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Payment_Carrier_Services',
    tableName: ' carriers_services_payment'
  }
)

//Payment_Carrier_Services.sync({ force: true }).then(re => console.log(re))

/**One carrier have many payment  */

Carriers.hasMany(Payment_Carrier_Services, { foreignKey: 'carrier_id' })

Payment_Carrier_Services.belongsTo(Carriers, {
  targetKey: 'carrier_id',
  foreignKey: 'carrier_id'
})
/*
 *boolean return type which will indicate that the table is defined or not
 */
// console.log(
//   Payment_Carrier_Services === sequelize.models.Payment_Carrier_Services
// )
module.exports = Payment_Carrier_Services
