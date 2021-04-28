'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize'),
    Field_Executive = require('../Stakeholders/Field_Executive')

class ExecutiveLogins extends Model { }

ExecutiveLogins.init(
    {
        execu_login_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        execu_login_uuid: {
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
        loggedInStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        loggedOutStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        ipAddress: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        loggedOutDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        field_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            references: {
                model: 'field_executive',
                key: 'field_id'
            },

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }

    },
    {
        sequelize,
        // We need to pass the connection instance
        modelName: 'ExecutiveLogins',
        tableName: 'executiveLogins'
    }
)

/**
 * One Field Executive table will have many notifications
 */
Field_Executive.hasMany(ExecutiveLogins, {
    foreignKey: 'field_id'
})

ExecutiveLogins.belongsTo(Field_Executive, {
    targetKey: 'field_id',
    foreignKey: 'field_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Packages === sequelize.models.Packages)
module.exports = ExecutiveLogins
