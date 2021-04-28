const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize'),
    Field_Executive = require('../Stakeholders/Field_Executive')

class AgencyTypes extends Model { }

AgencyTypes.init(
    {
        agencytype_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        agencytype_uuid: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            autoIncrement: false,
            primaryKey: false,

        },
        type_name: {
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
        }
    },
    {
        sequelize,
        // We need to pass the connection instance
        modelName: 'AgencyTypes',
        tableName: 'agencyTypes'
    }
)


/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Agency_Info === sequelize.models.Agency_Info)
module.exports = AgencyTypes
