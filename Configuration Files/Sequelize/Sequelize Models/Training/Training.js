'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize')

class Training extends Model { }

Training.init(
    {
        training_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        training_uuid: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            autoIncrement: false,
            primaryKey: false,
             
        },
        paused: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        purpose: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        // We need to pass the connection instance
        modelName: 'Training',
        tableName: 'training'
    }
)



/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Department === sequelize.models.Department)
module.exports = Training
