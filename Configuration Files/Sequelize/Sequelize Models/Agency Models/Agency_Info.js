
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Field_Executive = require('../Stakeholders/Field_Executive')

class Agency_Info extends Model { }

Agency_Info.init(
  {
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    agency_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,

    },
    agency_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agency_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agency_Contact: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agency_city: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agency_address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agency_Longitude: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    agency_Latitude: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    firstVisit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    agency_owner_Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contactedPerson: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contactedPerson_Number: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isPaused: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      validate: {
        max: 11,
        isNumeric: true
      },
      references: {
        model: 'field_executive',
        key: 'field_id'
      }
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'Agency_Info',
    tableName: 'agency_info'
  }
)

/**
 * which field executive have added this agency
 */
Field_Executive.hasMany(Agency_Info, { foreignKey: 'field_id' })

Agency_Info.belongsTo(Field_Executive, {
  targetKey: 'field_id',
  foreignKey: 'field_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Agency_Info === sequelize.models.Agency_Info)
module.exports = Agency_Info
