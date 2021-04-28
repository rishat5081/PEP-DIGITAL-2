'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize'),
    Manager = require('../Stakeholders/Manager')

class ManagerNotifications extends Model { }

ManagerNotifications.init(
    {
        manager_notification_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        manager_notification_uuid: {
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
        man_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            references: {
                model: 'managers',
                key: 'man_id'
            },

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }

    },
    {
        sequelize,
        // We need to pass the connection instance
        modelName: 'ManagerNotifications',
        tableName: 'managerNotifications'
    }
)

/**
 * One Manager table will have many notifications
 */
Manager.hasMany(ManagerNotifications, {
    foreignKey: 'man_id'
})

ManagerNotifications.belongsTo(Manager, {
    targetKey: 'man_id',
    foreignKey: 'man_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Packages === sequelize.models.Packages)
module.exports = ManagerNotifications
