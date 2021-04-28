'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize')
const sequelize = require('../../Sequelize'),
  PEP_Agents = require('./PEP_Agents')

class PEP_Agents_Activities extends Model { }

PEP_Agents_Activities.init(
  {
    pep_dealer_act_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    pep_dealer_act_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,
       
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pep_dealers_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      validate: {
        max: 11,
        isNumeric: true
      },
      references: {
        model: 'dealers_info_from_pep',
        key: 'pep_dealers_id'
      }
    },
    cust_care_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      validate: {
        max: 11,
        isNumeric: true
      },
      references: {
        model: 'cust_care_csr',
        key: 'cust_care_id'
      }
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'PEP_Agents_Activities',
    tableName: 'dealers_of_pep_activities'
  }
)

PEP_Agents.hasMany(PEP_Agents_Activities, { foreignKey: 'pep_dealers_id' })

PEP_Agents_Activities.belongsTo(PEP_Agents, {
  targetKey: 'pep_dealers_id',
  foreignKey: 'pep_dealers_id'
})
//PEP_Agents_Activities.sync({ force: true }).then(re => //console.log(re))

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(PEP_Agents_Activities === sequelize.models.PEP_Agents_Activities)
module.exports = PEP_Agents_Activities
