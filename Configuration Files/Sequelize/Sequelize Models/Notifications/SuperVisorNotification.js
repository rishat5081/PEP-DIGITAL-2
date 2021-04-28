'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize'),
    Supervisor = require('../Stakeholders/Supervisor')

class SuperVisorNotification extends Model { }

SuperVisorNotification.init(
    {
        supervisor_notification_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        supervisor_notification_uuid: {
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
        notification_title: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        notification_text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        modelName: 'SuperVisorNotification',
        tableName: 'superVisorNotification'
    }
)

/**
 * One Field Executive table will have many notifications
 */
Supervisor.hasMany(SuperVisorNotification, {
    foreignKey: 'sup_id'
})

SuperVisorNotification.belongsTo(Supervisor, {
    targetKey: 'sup_id',
    foreignKey: 'sup_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Packages === sequelize.models.Packages)
module.exports = SuperVisorNotification
