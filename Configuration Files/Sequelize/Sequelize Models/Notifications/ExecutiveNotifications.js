'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize'),
    Field_Executive = require('../Stakeholders/Field_Executive')

class ExecutiveNotifications extends Model { }

ExecutiveNotifications.init(
    {
        execu_notification_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        execu_notification_uuid: {
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
        modelName: 'ExecutiveNotifications',
        tableName: 'executiveNotifications'
    }
)

/**
 * One Field Executive table will have many notifications
 */
Field_Executive.hasMany(ExecutiveNotifications, {
    foreignKey: 'field_id'
})

ExecutiveNotifications.belongsTo(Field_Executive, {
    targetKey: 'field_id',
    foreignKey: 'field_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Packages === sequelize.models.Packages)
module.exports = ExecutiveNotifications
