'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Super_Admin = require('../Stakeholders/Super_Admin'),
  Companies_Access = require('../Company/Companies_Access')

class Carriers extends Model {}

Carriers.init(
  {
    carrier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    carrier_uuid:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,
       
    },
    carrier_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    carrier_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    carrier_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    sa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      validate: {
        max: 11,
        isNumeric: true
      },
      references: {
        model: 'super_admin',
        key: 'sa_id'
      }
    },
    comp_access_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      validate: {
        max: 11,
        isNumeric: true
      },
      references: {
        model: 'companies_access',
        key: 'comp_access_id'
      }
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Carriers',
    tableName: 'carriers'
  }
)

//Carriers.sync({ force: true }).then(re => //console.log(re))

/**Super admin to carrier */
Super_Admin.hasMany(Carriers, { foreignKey: 'sa_id' })

Carriers.belongsTo(Super_Admin, {
  targetKey: 'sa_id',
  foreignKey: 'sa_id'
})
/**Companies to the carrier */
Companies_Access.hasMany(Carriers, { foreignKey: 'comp_access_id' })

Carriers.belongsTo(Companies_Access, {
  targetKey: 'comp_access_id',
  foreignKey: 'comp_access_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Carriers === sequelize.models.Carriers)
module.exports = Carriers
