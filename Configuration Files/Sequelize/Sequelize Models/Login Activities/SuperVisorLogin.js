'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize'),
    Supervisor = require('../Stakeholders/Supervisor')

class SuperVisorLogin extends Model { }

SuperVisorLogin.init(
    {
        supervisor_login_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        supervisor_login_uuid: {
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
        loggedOutDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        ipAddress: {
            type: DataTypes.TEXT,
            allowNull: true
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

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }

    },
    {
        sequelize,
        // We need to pass the connection instance
        modelName: 'SuperVisorLogin',
        tableName: 'superVisorLogin'
    }
)

/**
 * One Field Executive table will have many notifications
 */
Supervisor.hasMany(SuperVisorLogin, {
    foreignKey: 'sup_id'
})

SuperVisorLogin.belongsTo(Supervisor, {
    targetKey: 'sup_id',
    foreignKey: 'sup_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Packages === sequelize.models.Packages)
module.exports = SuperVisorLogin
